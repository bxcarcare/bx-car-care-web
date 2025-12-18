"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signUp } from "@/lib/auth";

type Role = "client" | "owner";

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();

  const role = (params.get("role") as Role) || "client";
  const nextPath = useMemo(() => (role === "owner" ? "/owner" : "/client"), [role]);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error: err } = await signUp(email.trim(), password);
        if (err) throw err;

        // Depois de criar conta, manda pra mesma tela e faz login (simples e direto)
        const { error: err2 } = await signIn(email.trim(), password);
        if (err2) throw err2;
      } else {
        const { error: err } = await signIn(email.trim(), password);
        if (err) throw err;
      }

      router.push(nextPath);
    } catch (err: any) {
      setError(err?.message || "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  }

  const roleLabel = role === "owner" ? "Owner" : "Cliente";

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brandRow}>
          <div style={styles.logoDot} />
          <div>
            <div style={styles.title}>BX Car Care</div>
            <div style={styles.subtitle}>
              Entrar como <b>{roleLabel}</b>
            </div>
          </div>
        </div>

        <div style={styles.modeRow}>
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{ ...styles.modeBtn, ...(mode === "login" ? styles.modeActive : {}) }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{ ...styles.modeBtn, ...(mode === "signup" ? styles.modeActive : {}) }}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            style={styles.input}
            autoComplete="email"
          />

          <label style={styles.label}>Senha</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={styles.input}
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />

          {error ? <div style={styles.error}>{error}</div> : null}

          <button disabled={loading} style={styles.primaryBtn} type="submit">
            {loading ? "Aguarde..." : mode === "signup" ? "Criar e entrar" : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            style={styles.secondaryBtn}
          >
            Voltar
          </button>
        </form>

        <div style={styles.footer}>
          Dica: se você estiver em “Email confirmations” no Supabase, pode precisar confirmar email.
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 18,
    background:
      "radial-gradient(900px 600px at 15% 10%, rgba(255,255,255,0.10), transparent 50%), radial-gradient(700px 500px at 90% 20%, rgba(0,180,255,0.12), transparent 55%), #0b0b0f",
    color: "#fff",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 18,
    padding: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
  },
  brandRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  logoDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
    boxShadow: "0 0 0 6px rgba(124,58,237,0.12)",
  },
  title: { fontSize: 18, fontWeight: 900, letterSpacing: 0.2 },
  subtitle: { fontSize: 12, opacity: 0.85 },

  modeRow: {
    display: "flex",
    gap: 10,
    marginTop: 10,
    marginBottom: 14,
  },
  modeBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.22)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 800,
  },
  modeActive: {
    background: "linear-gradient(135deg, rgba(0,212,255,0.24), rgba(124,58,237,0.22))",
    border: "1px solid rgba(255,255,255,0.22)",
  },

  form: { display: "grid", gap: 10 },
  label: { fontSize: 12, opacity: 0.9 },
  input: {
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.24)",
    color: "#fff",
    outline: "none",
  },
  error: {
    padding: 10,
    borderRadius: 12,
    background: "rgba(255, 70, 70, 0.12)",
    border: "1px solid rgba(255, 70, 70, 0.25)",
    color: "#ffd2d2",
    fontSize: 12,
  },
  primaryBtn: {
    marginTop: 4,
    padding: 12,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
    color: "#0b0b0f",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.18)",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },
  footer: { marginTop: 12, fontSize: 11, opacity: 0.7, lineHeight: 1.4 },
};
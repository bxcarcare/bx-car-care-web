"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();

  const role = (params.get("role") || "client").toLowerCase();
  const roleLabel = role === "owner" ? "Owner" : "Cliente";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.length >= 6 && !loading;
  }, [email, password, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { role }, // guarda o role no metadata do usuário
          },
        });

        if (error) throw error;

        // Dependendo do seu Supabase, pode pedir confirmação por email.
        // Mesmo assim, mostramos sucesso.
        setMsg({
          type: "ok",
          text:
            "Conta criada! Se o Supabase estiver com confirmação por email ligada, verifique seu email para confirmar. Depois faça login.",
        });

        setMode("signin");
        return;
      }

      // signin
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      setMsg({ type: "ok", text: "Login feito com sucesso! Redirecionando..." });

      // manda pra área correta
      if (role === "owner") router.push("/owner");
      else router.push("/client");
    } catch (err: any) {
      setMsg({ type: "err", text: err?.message || "Erro ao autenticar." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.logo} />
          <h1 style={styles.title}>BX Car Care</h1>
          <p style={styles.subtitle}>
            Entrar como <b>{roleLabel}</b>
          </p>
        </div>

        <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => setMode("signin")}
            style={{
              ...styles.tabBtn,
              ...(mode === "signin" ? styles.tabBtnActive : {}),
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{
              ...styles.tabBtn,
              ...(mode === "signup" ? styles.tabBtnActive : {}),
            }}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@email.com"
            type="email"
            autoComplete="email"
            style={styles.input}
          />

          <label style={{ ...styles.label, marginTop: 12 }}>Senha</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="mínimo 6 caracteres"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            style={styles.input}
          />

          {msg && (
            <div
              style={{
                ...styles.alert,
                ...(msg.type === "ok" ? styles.alertOk : styles.alertErr),
              }}
            >
              {msg.text}
            </div>
          )}

          <button
            disabled={!canSubmit}
            type="submit"
            style={{
              ...styles.primaryBtn,
              ...(canSubmit ? {} : styles.primaryBtnDisabled),
            }}
          >
            {loading
              ? "Aguarde..."
              : mode === "signup"
              ? "Criar conta"
              : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            style={styles.secondaryBtn}
          >
            Voltar
          </button>

          <p style={styles.footer}>
            Você está criando/entrando como{" "}
            <span style={styles.footerStrong}>{roleLabel}</span>.
            <span style={styles.footerMuted}>
              {" "}
              (Isso vem da Home)
            </span>
          </p>
        </form>
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
      "radial-gradient(1200px 800px at 20% 10%, rgba(99,102,241,.22), transparent 60%)," +
      "radial-gradient(900px 600px at 80% 30%, rgba(34,197,94,.14), transparent 55%)," +
      "radial-gradient(700px 500px at 50% 90%, rgba(236,72,153,.16), transparent 60%)," +
      "linear-gradient(180deg, #06070a 0%, #090a12 50%, #070812 100%)",
    color: "#fff",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    padding: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 20px 60px rgba(0,0,0,.45)",
    backdropFilter: "blur(10px)",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    paddingTop: 6,
    paddingBottom: 14,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    background:
      "linear-gradient(135deg, rgba(99,102,241,.95), rgba(236,72,153,.9))",
    boxShadow: "0 12px 30px rgba(99,102,241,.25)",
  },
  title: {
    margin: 0,
    fontSize: 26,
    letterSpacing: 0.3,
  },
  subtitle: {
    margin: 0,
    fontSize: 13,
    opacity: 0.85,
  },
  tabs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 14,
  },
  tabBtn: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 800,
  },
  tabBtnActive: {
    background: "rgba(99,102,241,0.20)",
    border: "1px solid rgba(99,102,241,0.40)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingTop: 6,
  },
  label: {
    fontSize: 12,
    opacity: 0.85,
    marginLeft: 2,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    outline: "none",
  },
  alert: {
    marginTop: 6,
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: 13,
    lineHeight: 1.3,
  },
  alertOk: {
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.35)",
  },
  alertErr: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.35)",
  },
  primaryBtn: {
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    fontWeight: 900,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
  },
  primaryBtnDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
  },
  secondaryBtn: {
    padding: 14,
    borderRadius: 14,
    fontWeight: 900,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    cursor: "pointer",
  },
  footer: {
    marginTop: 10,
    display: "flex",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    opacity: 0.75,
    fontSize: 12,
  },
  footerStrong: { fontWeight: 900, opacity: 0.95 },
  footerMuted: { opacity: 0.75 },
};
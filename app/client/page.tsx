import Link from "next/link";

export default function ClientHome() {
  return (
    <main style={container}>
      <div style={overlay} />

      <div style={card}>
        <h1 style={title}>Client Area</h1>
        <p style={subtitle}>View your services, invoices and appointments</p>

        <div style={grid}>
          <Link href="/client/appointments" style={{ textDecoration: "none" }}>
            <button style={btn}>📅 Appointments</button>
          </Link>

          <Link href="/client/estimates" style={{ textDecoration: "none" }}>
            <button style={btn}>📄 My Estimates</button>
          </Link>

          <Link href="/client/invoices" style={{ textDecoration: "none" }}>
            <button style={btn}>💵 My Invoices</button>
          </Link>

          {/* ÚLTIMA OPÇÃO */}
          <Link href="/client/support" style={{ textDecoration: "none" }}>
            <button style={btnPrimary}>🆘 Support</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "grid",
  placeItems: "center",
  padding: 24,
  position: "relative",
};

const overlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.30)",
};

const card: React.CSSProperties = {
  position: "relative",
  width: 380,
  maxWidth: "100%",
  background: "#f2f2f2",
  borderRadius: 18,
  padding: 28,
  textAlign: "center",
  boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: 24,
  fontWeight: 900,
  color: "#111",
};

const subtitle: React.CSSProperties = {
  marginTop: 6,
  marginBottom: 18,
  fontSize: 14,
  color: "#222",
  opacity: 0.85,
};

const grid: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const btn: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #bbb",
  background: "#dcdcdc",
  fontWeight: 800,
  color: "#111",
  cursor: "pointer",
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  border: "none",
  background: "#111",
  color: "#fff",
};
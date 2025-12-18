export default function OwnerHome() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>
        Owner Dashboard
      </h1>

      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        <button>➕ Novo Cliente</button>
        <button>📦 Estoque</button>
        <button>📄 Estimates</button>
        <button>💵 Invoices</button>
      </div>
    </main>
  );
}
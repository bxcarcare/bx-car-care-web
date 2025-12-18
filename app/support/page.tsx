"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SupportPage() {
  const [companyId, setCompanyId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string>("");

  async function send() {
    setStatus("Sending message...");

    if (!companyId || !senderName || !message) {
      setStatus("Please fill in Company ID, your name and the message.");
      return;
    }

    const { error } = await supabase.from("messages").insert([
      {
        company_id: companyId,
        sender_role: "client",
        sender_name: senderName,
        message: message,
      },
    ]);

    if (error) {
      setStatus("Error: " + error.message);
      return;
    }

    setMessage("");
    setStatus("✅ Message sent successfully!");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "100%",
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          border: "1px solid #ddd",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111" }}>
          Support
        </h1>
        <p style={{ marginTop: 6, opacity: 0.7, color: "#111" }}>
          Send a message directly to the business owner.
        </p>

        <label style={labelStyle}>Company ID</label>
        <input
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Paste the company UUID"
          style={inputStyle}
        />

        <label style={labelStyle}>Your name</label>
        <input
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="e.g. John"
          style={inputStyle}
        />

        <label style={labelStyle}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. I would like to schedule a service..."
          rows={4}
          style={{ ...inputStyle, resize: "vertical" as const }}
        />

        <button onClick={send} style={btnStyle}>
          Send Message
        </button>

        {status && (
          <p style={{ marginTop: 12, fontSize: 13, color: "#111", opacity: 0.85 }}>
            {status}
          </p>
        )}
      </div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginTop: 14,
  fontSize: 12,
  fontWeight: 700,
  color: "#111",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 6,
  padding: 12,
  borderRadius: 12,
  border: "1px solid #bbb",
  outline: "none",
  fontSize: 14,
  color: "#111",
  background: "#fff",
};

const btnStyle: React.CSSProperties = {
  marginTop: 16,
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  fontWeight: 800,
  background: "#111",
  color: "#fff",
};
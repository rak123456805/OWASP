// src/components/CryptographicFailuresSandbox.jsx
import React, { useState, useEffect, useRef } from "react";
import "../../vulnerable-components/assets/VulnerabilityPage.css";
import "../assets/CryptographicFailuresSandbox.css";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../config/api";

export default function CryptographicFailuresSandbox() {
  const navigate = useNavigate();
  const [input, setInput] = useState("my-secret-password");
  const [results, setResults] = useState([]);
  const [token, setToken] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [loading, setLoading] = useState(false);
  const hasInitialized = useRef(false);

  function addResult(title, body, explanation) {
    setResults((prev) => [
      { id: Date.now() + Math.random(), title, body, explanation },
      ...prev,
    ]);
  }

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      addResult(
        "Welcome to the Cryptographic Failures Sandbox",
        {
          steps: [
            "1) Enter a text value below.",
            "2) Try Hash (MD5) or Encrypt (static).",
            "3) Then try Login / Verify / Store / Reveal.",
            "4) Watch responses and explanations in the console.",
            "5) Use Clear Console or Restart Demo anytime.",
          ],
        },
        "Follow each step to see how weak cryptographic methods behave."
      );
    }
  }, []);

  async function postJSON(path, payload) {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl(5001, path), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => null);
      return { status: res.status, body };
    } catch (err) {
      return { status: 0, body: { error: err.message } };
    } finally {
      setLoading(false);
    }
  }

  // === Actions ===
  const doMD5 = async () => {
    const r = await postJSON("/crypto/hash-md5", { text: input });
    addResult(
      "MD5 Hash",
      r,
      "MD5 hashing is fast and predictable — unsafe for password storage."
    );
  };

  const doEncryptStatic = async () => {
    const r = await postJSON("/crypto/encrypt-static", { text: input });
    if (r?.body?.ciphertext) setCiphertext(r.body.ciphertext);
    addResult(
      "Encrypt (Static Key/IV)",
      r,
      "Using a static key/IV makes identical inputs produce identical ciphertext — easily predictable."
    );
  };

  const doDecryptStatic = async () => {
    if (!ciphertext) {
      addResult(
        "Decrypt (Static)",
        { status: 400, body: { error: "No ciphertext yet. Run Encrypt first." } },
        "You must encrypt first before decrypting."
      );
      return;
    }
    const r = await postJSON("/crypto/decrypt-static", { ciphertext });
    addResult(
      "Decrypt (Static)",
      r,
      "Shows the plaintext recovered using static key/IV."
    );
  };

  const loginAlice = async () => {
    const r = await postJSON("/auth/login", {
      username: "alice",
      password: "aliceplaintext",
    });
    if (r.body?.token) {
      setToken(r.body.token);
      addResult(
        "Login as Alice",
        r,
        "Logged in with weak plaintext password; token issued using weak secret."
      );
    } else addResult("Login as Alice", r, "Login failed. Check backend data.");
  };

  const verifyJwt = async () => {
    if (!token) {
      addResult("Verify JWT", { error: "No token available" }, "Login first.");
      return;
    }
    const r = await postJSON("/crypto/verify-jwt", { token });
    addResult("Verify JWT", r, "Demonstrates JWT verification with weak secret.");
  };

  const storeSecret = async () => {
    const r = await postJSON("/users/1/store-secret", { secret: input });
    addResult(
      "Store Secret (User 1)",
      r,
      "Secret stored encrypted using static key — insecure storage example."
    );
  };

  const revealSecret = async () => {
    try {
      const res = await fetch(getApiUrl(5001, "/users/1/secret"));
      const body = await res.json().catch(() => null);
      addResult(
        "Reveal Secret (User 1)",
        { status: res.status, body },
        "Displays the stored secret — demonstrates lack of proper encryption."
      );
    } catch (err) {
      addResult("Reveal Secret (User 1)", { error: err.message }, "Request failed.");
    }
  };

  const clearConsole = () => setResults([]);
  const restart = () => {
    setInput("my-secret-password");
    setCiphertext("");
    setToken("");
    setResults([]);
    addResult(
      "Welcome to the Cryptographic Failures Sandbox",
      {
        steps: [
          "1) Enter a text value below.",
          "2) Try Hash (MD5) or Encrypt (static).",
          "3) Then try Login / Verify / Store / Reveal.",
          "4) Watch responses and explanations in the console.",
          "5) Use Clear Console or Restart Demo anytime.",
        ],
      },
      "Follow each step to see how weak cryptographic methods behave."
    );
  };

  return (
    <div className="vulnerability-page">
      {/* === HEADER === */}
      <div
        className="vp-hero"
        style={{
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="vp-hero-content">
          <h1 className="vp-title">Cryptographic Failures Sandbox</h1>
          <p className="vp-subtitle">
            Explore and test different cryptographic failures interactively — weak hashes,
            static keys, and insecure tokens.
          </p>
          <button
            className="frontend-btn"
            style={{ padding: "8px 16px", fontSize: "0.9rem" }}
            onClick={() => navigate(-1)}
          >
            Back to Overview
          </button>
        </div>
      </div>

      {/* === Steps Section === */}
      <div
        className="vp-section"
        style={{
          maxWidth: '1200px',
          margin: '2rem auto 0 auto',
          background: 'rgba(255,205,88,0.05)',
          color: '#f1f5f9',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,205,88,0.2)',
        }}
      >
        <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
        <p style={{ fontSize: '15px', color: '#d1d5db', marginBottom: '1rem' }}>
          Explore how weak cryptographic implementations can be bypassed or predicted.
        </p>
        <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li><strong>Test Weak Hashing:</strong> Enter a password and click <b>Hash (MD5)</b>. MD5 is broken and easily reversible via rainbow tables.</li>
          <li><strong>Static Key Encryption:</strong> Click <b>Encrypt (static)</b>. Note the ciphertext. Change one letter in your input and encrypt again. Notice how predictable the output is when using static keys.</li>
          <li><strong>JWT Exploitation:</strong> Click <b>Login (Alice)</b> to get a token, then <b>Verify JWT</b>. In a real attack, you could try to forge this JWT if the secret is weak.</li>
          <li><strong>Insecure Storage:</strong> Click <b>Store Secret</b> then <b>Reveal Secret</b>. Observe how the "stored" data is easily recoverable.</li>
        </ol>
      </div>

      {/* === MAIN GRID === */}
      <div
        className="sandbox-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "2rem",
          padding: "0 2rem",
        }}
      >
        {/* LEFT - Inputs */}
        <div className="sandbox-left">
          <div className="vp-section">
            <h2>Input & Actions</h2>
            <input
              className="vp-input"
              style={{ width: "500px", padding: "10px", borderRadius: "8px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button className="frontend-btn" onClick={doMD5} disabled={loading}>
                Hash (MD5)
              </button>
              <button className="frontend-btn" onClick={doEncryptStatic} disabled={loading}>
                Encrypt (static)
              </button>
              <button className="frontend-btn" onClick={doDecryptStatic} disabled={loading}>
                Decrypt
              </button>
            </div>
          </div>

          <div className="vp-section">
            <h2>Auth & Secrets</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button className="frontend-btn" onClick={loginAlice} disabled={loading}>
                Login (Alice)
              </button>
              <button className="frontend-btn" onClick={verifyJwt} disabled={!token || loading}>
                Verify JWT
              </button>
              <button className="frontend-btn" onClick={storeSecret} disabled={loading}>
                Store Secret
              </button>
              <button className="frontend-btn" onClick={revealSecret} disabled={loading}>
                Reveal Secret
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT - Console */}
        <div className="sandbox-right">
          <h2>Console Output</h2>
          <div
            className="results-list"
            style={{
              background: "#0f172a",
              color: "#e2e8f0",
              borderRadius: "8px",
              padding: "15px",
              minHeight: "550px",
              overflowY: "auto",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {results.length === 0 && (
              <div style={{ opacity: 0.6 }}>No output yet. Perform an action to view responses.</div>
            )}
            {results.map((r) => (
              <div
                key={r.id}
                style={{
                  borderBottom: "1px solid #1e293b",
                  marginBottom: "12px",
                  paddingBottom: "10px",
                }}
              >
                <strong>{r.title}</strong>
                <pre
                  style={{
                    background: "#1e293b",
                    color: "#cbd5e1",
                    padding: "8px",
                    borderRadius: "6px",
                    marginTop: "6px",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {JSON.stringify(r.body, null, 2)}
                </pre>
                <div style={{ marginTop: "6px", fontSize: "0.9rem", color: "#94a3b8" }}>
                  {r.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Controls === */}
      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <button className="frontend-btn secondary" onClick={clearConsole}>
          Clear Console
        </button>
        <button className="frontend-btn danger" onClick={restart}>
          Restart Demo
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <small style={{ color: "#9ca3af" }}>
          ⚠️ For educational use only — this environment intentionally demonstrates weak cryptographic practices.
        </small>
      </div>
    </div>
  );
}

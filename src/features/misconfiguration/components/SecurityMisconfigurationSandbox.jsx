import React, { useState } from "react";
import styles from "../assets/SecurityMisconfigurationSandbox.module.css";
import { getApiUrl } from "../../../config/api";

const API_BASE = getApiUrl(5300);

export default function SecurityMisconfigurationSandbox() {
  const [vulnerableResp, setVulnerableResp] = useState("");
  const [safeResp, setSafeResp] = useState("");
  const [logs, setLogs] = useState([]);
  const [filename, setFilename] = useState("test.txt");

  function appendLog(msg) {
    setLogs((l) => [
      new Date().toLocaleTimeString() + " — " + msg,
      ...l,
    ].slice(0, 50));
  }

  async function doFetch(path, opts = {}, target = "vulnerable") {
    const url = `${API_BASE}${path}`;
    appendLog(`Calling ${url}`);

    try {
      const res = await fetch(url, opts);
      const text = await res.text();
      const display = `HTTP ${res.status}\n${text}`;

      if (target === "vulnerable") setVulnerableResp(display);
      else setSafeResp(display);

    } catch (err) {
      appendLog(`Fetch error: ${err.message}`);

      if (target === "vulnerable") setVulnerableResp(String(err));
      else setSafeResp(String(err));
    }
  }

  // Vulnerable actions
  const fetchVulnerableDefaults = () => doFetch("/vulnerable/defaults");
  const fetchVulnerableHeaders = () => doFetch("/vulnerable/headers");
  const fetchVulnerableFiles = () => doFetch("/vulnerable/files");
  const deleteVulnerableFile = () =>
    doFetch("/vulnerable/delete-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
  const triggerVulnerableError = () => doFetch("/vulnerable/error?debug=true");
  const checkVulnerableCors = () => doFetch("/vulnerable/cors");

  // Safe actions
  const fetchSafeDefaults = () => doFetch("/safe/defaults", {}, "safe");
  const fetchSafeHeaders = () => doFetch("/safe/headers", {}, "safe");
  const fetchSafeFiles = () => doFetch("/safe/files", {}, "safe");
  const deleteSafeFile = () =>
    doFetch(
      "/safe/delete-file",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": "let-me-admin",
        },
        body: JSON.stringify({ filename }),
      },
      "safe"
    );
  const triggerSafeError = () => doFetch("/safe/error", {}, "safe");
  const checkSafeCors = () => doFetch("/safe/cors", {}, "safe");

  return (
    <div className={styles.container}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.badge}>Security Misconfiguration</div>
        <h1 className={styles.title}>Security Misconfiguration — Sandbox</h1>
        <p className={styles.lead}>
          Compare intentionally insecure endpoints with safe alternatives.{" "}
          <strong>Local use only.</strong>
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '1.5rem', background: 'rgba(255,205,88,0.05)', borderRadius: '12px', border: '1px solid rgba(255,205,88,0.2)' }}>
        <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
        <p style={{ fontSize: '15px', color: '#d1d5db', marginBottom: '1rem' }}>
          Enumerate system defaults and exploit overly permissive configurations.
        </p>
        <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li><strong>Default Credentials:</strong> Click 🔓 Fetch Vulnerable Defaults. See how easy it is to find administrative passwords when they aren't changed.</li>
          <li><strong>Directory Listing:</strong> Click 📁 Fetch Vulnerable Files. Observe a full list of internal files—this should always be disabled.</li>
          <li><strong>Broken CORS:</strong> Click 🌐 Check Vulnerable CORS. See if the server allows <i>any</i> domain (<code>*</code>) to access its data.</li>
          <li><strong>Insecure Deletion:</strong> Click 🗑️ Delete File (Vulnerable). Notice how anyone can delete files without a token!</li>
        </ol>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.row}>
          <button className={styles.buttons} onClick={fetchVulnerableDefaults}>
            🔓 Fetch Vulnerable Defaults
          </button>
          <button className={styles.buttons} onClick={fetchSafeDefaults}>
            🛡️ Fetch Safe Defaults
          </button>
        </div>

        <div className={styles.row}>
          <button className={styles.buttons} onClick={fetchVulnerableHeaders}>
            📋 Check Vulnerable Headers
          </button>
          <button className={styles.buttons} onClick={fetchSafeHeaders}>
            📋 Check Safe Headers
          </button>
        </div>

        <div className={styles.row}>
          <button className={styles.buttons} onClick={fetchVulnerableFiles}>
            📁 Fetch Vulnerable Files
          </button>
          <button className={styles.buttons} onClick={fetchSafeFiles}>
            📁 Fetch Safe Files
          </button>
        </div>

        <div className={styles.row}>
          <input
            className={styles.input}
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="filename e.g. test.txt"
          />
          <button className={styles.buttons} onClick={deleteVulnerableFile}>
            🗑️ Delete File (Vulnerable)
          </button>
          <button className={styles.buttons} onClick={deleteSafeFile}>
            🗑️ Delete File (Safe)
          </button>
        </div>

        <div className={styles.row}>
          <button className={styles.buttons} onClick={triggerVulnerableError}>
            🚨 Trigger Vulnerable Error
          </button>
          <button className={styles.buttons} onClick={triggerSafeError}>
            🚨 Trigger Safe Error
          </button>
        </div>

        <div className={styles.row}>
          <button className={styles.buttons} onClick={checkVulnerableCors}>
            🌐 Check Vulnerable CORS
          </button>
          <button className={styles.buttons} onClick={checkSafeCors}>
            🌐 Check Safe CORS
          </button>
        </div>
      </div>

      {/* Results */}
      <div className={styles.results}>
        <div className={styles.card}>
          <h3>📉 Vulnerable Response</h3>
          <pre className={styles.pre}>
            {vulnerableResp || "No response yet."}
          </pre>
        </div>

        <div className={styles.card}>
          <h3>📈 Safe Response</h3>
          <pre className={styles.pre}>
            {safeResp || "No response yet."}
          </pre>
        </div>

        <div className={styles.card}>
          <h3>📝 Logs / Notes</h3>
          <div className={styles.pre}>
            {logs.length === 0
              ? "No logs yet."
              : logs.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
      </div>

      {/* Sandbox Instructions */}
      <div className={styles.tips}>
        <h4>🎓 How to Use This Sandbox</h4>
        <ul>
          <li>
            <b>Fetch Vulnerable Defaults:</b> Shows exposed default credentials
            and insecure config values.
          </li>
          <li>
            <b>Fetch Safe Defaults:</b> Returns only non-sensitive config fields.
          </li>
          <li>
            <b>Check Vulnerable Headers:</b> Missing HSTS, CSP, X-Frame-Options.
          </li>
          <li>
            <b>Check Safe Headers:</b> Demonstrates secure header configuration.
          </li>
          <li>
            <b>Fetch Vulnerable Files:</b> Shows directory listing — dangerous.
          </li>
          <li>
            <b>Fetch Safe Files:</b> Returns sanitized listing or forbids access.
          </li>
          <li>
            <b>Delete File (Vulnerable):</b> No authentication required.
          </li>
          <li>
            <b>Delete File (Safe):</b> Requires admin token.
          </li>
          <li>
            <b>Trigger Vulnerable Error:</b> Leaks full stack trace.
          </li>
          <li>
            <b>Trigger Safe Error:</b> Shows only generic error.
          </li>
          <li>
            <b>Check Vulnerable CORS:</b> Shows `Access-Control-Allow-Origin: *`
          </li>
          <li>
            <b>Check Safe CORS:</b> Restricts to trusted origin only.
          </li>
        </ul>
      </div>

      {/* Learning Tips */}
      <div className={styles.tips}>
        <h4>💡 Learning Tips</h4>
        <ul>
          <li>Never leave default credentials in production.</li>
          <li>Always configure strict security headers.</li>
          <li>Disable directory listing everywhere.</li>
          <li>Use proper authentication for sensitive actions.</li>
          <li>Show only generic error messages to users.</li>
          <li>Avoid permissive CORS rules.</li>
        </ul>
      </div>
    </div >
  );
}

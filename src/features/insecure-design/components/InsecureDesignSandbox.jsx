import React, { useState } from 'react';
import styles from '../assets/InsecureDesignSandbox.module.css';
import { getApiUrl } from "../../../config/api";

const API_BASE = getApiUrl(5200);

export default function InsecureDesignSandbox() {
  const [configVuln, setConfigVuln] = useState(null);
  const [configSafe, setConfigSafe] = useState(null);
  const [toggleRes, setToggleRes] = useState(null);
  const [errorRes, setErrorRes] = useState(null);
  const [featureName, setFeatureName] = useState("");
  const [featureValue, setFeatureValue] = useState(true);
  const [statusMsg, setStatusMsg] = useState(null);

  function showStatus(msg, type = "info") {
    setStatusMsg({ text: msg, type });
    setTimeout(() => setStatusMsg(null), 4000);
  }

  async function fetchVulnerableConfig() {
    try {
      const res = await fetch(`${API_BASE}/vulnerable/config`);
      const data = await res.json();
      setConfigVuln(data);
      showStatus("⚠️ CRITICAL LEAK: Full system configuration exposed!", "danger");
    } catch (err) {
      showStatus("Failed to fetch vulnerable config", "danger");
    }
  }

  async function fetchSafeConfig() {
    try {
      const res = await fetch(`${API_BASE}/safe/config`);
      const data = await res.json();
      setConfigSafe(data);
      showStatus("✅ Safe config fetched. No secrets exposed.", "success");
    } catch (err) {
      showStatus("Failed to fetch safe config", "danger");
    }
  }

  async function toggleVuln() {
    if (!featureName) return showStatus("Enter a feature name first", "info");
    try {
      const res = await fetch(`${API_BASE}/vulnerable/toggle-feature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature: featureName, enabled: featureValue })
      });
      const data = await res.json();
      setToggleRes(data);
      showStatus(`⚡ Feature '${featureName}' toggled without authentication!`, "warning");
    } catch (err) {
      showStatus("Action failed", "danger");
    }
  }

  async function toggleSafe() {
    if (!featureName) return showStatus("Enter a feature name first", "info");
    try {
      const res = await fetch(`${API_BASE}/safe/toggle-feature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'let-me-admin'
        },
        body: JSON.stringify({ feature: featureName, enabled: featureValue })
      });
      const data = await res.json();
      setToggleRes(data);
      showStatus(`🔒 Feature '${featureName}' toggled securely (admin token used).`, "success");
    } catch (err) {
      showStatus("Authentication required for this action", "danger");
    }
  }

  async function triggerError() {
    try {
      const res = await fetch(`${API_BASE}/vulnerable/error`);
      const data = await res.json();
      setErrorRes(data);
      showStatus("🚨 Verbose Error Triggered: Check results for stack trace leak.", "danger");
    } catch (err) {
      showStatus("Error trigger failed", "danger");
    }
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.badge}>Insecure Design</div>
        <h1 className={styles.title}>Insecure Design Sandbox</h1>
        <p className={styles.lead}>
          Explore how poor design choices lead to secret leaks and unauthorized control.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '1.5rem', background: 'rgba(255,205,88,0.05)', borderRadius: '12px', border: '1px solid rgba(255,205,88,0.2)' }}>
        <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
        <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li><strong>Extract Secrets:</strong> Click 🔓 Fetch Vulnerable Config. Notice the <b>Sensitive Data Leaked</b> banner. An attacker now has your DB passwords.</li>
          <li><strong>Bypass Auth:</strong> Enter <code>debugMode</code> in the feature name and click ⚡ Toggle (Vulnerable). You just modified a system setting with no password!</li>
          <li><strong>Leaking Internals:</strong> Click 🚨 Trigger Vulnerable Error. Look at the result to see how the server exposes its entire stack trace and internal paths.</li>
        </ol>
      </div>

      {statusMsg && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '1rem 2rem',
          borderRadius: '8px',
          background: statusMsg.type === 'danger' ? '#ff4d4d' : statusMsg.type === 'warning' ? '#ffcd58' : '#00ff88',
          color: '#000',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {statusMsg.text}
        </div>
      )}

      {/* Controls Section */}
      <div className={styles.controls}>
        <div className={styles.row}>
          <button className={styles.btn} onClick={fetchVulnerableConfig}>
            🔓 Fetch Vulnerable Config
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={fetchSafeConfig}>
            🛡️ Fetch Safe Config
          </button>
        </div>

        <div className={styles.row}>
          <input
            className={styles.input}
            value={featureName}
            onChange={e => setFeatureName(e.target.value)}
            placeholder="Feature name (e.g., debugMode)"
          />

          <select
            className={styles.select}
            value={featureValue}
            onChange={e => setFeatureValue(e.target.value === 'true')}
          >
            <option value="true">Enable</option>
            <option value="false">Disable</option>
          </select>

          <button className={styles.btn} onClick={toggleVuln}>
            ⚡ Toggle (Vulnerable)
          </button>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={toggleSafe}>
            🔒 Toggle (Safe)
          </button>
        </div>

        <div className={styles.row}>
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={triggerError}>
            🚨 Trigger Vulnerable Error
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className={styles.results}>
        <section className={styles.card} style={{ border: configVuln ? '1px solid #ff4d4d' : '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ color: configVuln ? '#ff4d4d' : 'inherit' }}>📉 Vulnerable Config {configVuln && "⚠️ LEAKED"}</h3>
          <pre className={styles.pre}>
            {configVuln ? JSON.stringify(configVuln, null, 2) : "No result yet. Fetch vulnerable config to see exposed secrets."}
          </pre>
        </section>

        <section className={styles.card}>
          <h3>📈 Safe Config</h3>
          <pre className={styles.pre}>
            {configSafe ? JSON.stringify(configSafe, null, 2) : "No result yet. Compare with vulnerable config to see security differences."}
          </pre>
        </section>

        <section className={styles.card}>
          <h3>⚡ Action Results</h3>
          <pre className={styles.pre}>
            {toggleRes
              ? JSON.stringify(toggleRes, null, 2)
              : errorRes
                ? JSON.stringify(errorRes, null, 2)
                : "Results from toggles or errors will appear here."}
          </pre>
        </section>
      </div>

      <div className={styles.tips}>
        <h4>💡 Learning Points</h4>
        <ul>
          <li><strong>Principle of Least Privilege:</strong> Endpoints should only return what the user <i>specifically</i> needs.</li>
          <li><strong>Design for Failure:</strong> When an error happens, the system shouldn't turn itself "inside out" by leaking code paths.</li>
          <li><strong>Defense in Depth:</strong> Never rely on "security by obscurity" (like assuming people won't find your toggle endpoints).</li>
        </ul>
      </div>
    </div >
  );
}
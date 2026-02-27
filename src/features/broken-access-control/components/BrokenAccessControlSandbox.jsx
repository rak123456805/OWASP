import React, { useState } from "react";
import "../assets/BrokenAccessControlSandbox.css";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../../config/api";

const BrokenAccessControlSandbox = () => {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState(null);
  const [token, setToken] = useState("");
  const [logs, setLogs] = useState([]);

  const addLog = (title, result, explanation) => {
    setLogs((prev) => [
      ...prev,
      {
        title,
        result: JSON.stringify(result, null, 2),
        explanation,
      },
    ]);
  };

  const login = async (username, password) => {
    setActiveUser(null);
    setToken("");
    setLogs([]);

    try {
      const res = await fetch(getApiUrl(4000, "/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setActiveUser(username);
        addLog(
          `Login as ${username}`,
          data,
          `${username} successfully authenticated and received a token.`
        );
      } else {
        addLog(`Login as ${username}`, data, "Login failed.");
      }
    } catch (err) {
      addLog(`Login as ${username}`, { error: err.message }, "Network error.");
    }
  };

  const accessDoc = async (targetDocId) => {
    try {
      const res = await fetch(getApiUrl(4000, `/documents/${targetDocId}`), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      addLog(
        `${activeUser} tries to access /documents/${targetDocId}`,
        data,
        data.error
          ? `${activeUser} was blocked from accessing document #${targetDocId}. Proper access control in action.`
          : `${activeUser} successfully accessed document #${targetDocId} — this demonstrates Broken Access Control vulnerability.`
      );
    } catch (err) {
      addLog(
        `${activeUser} tries /documents/${targetDocId}`,
        { error: err.message },
        "Network or request failed."
      );
    }
  };

  const clearConsole = () => setLogs([]);
  const restartDemo = () => {
    setLogs([]);
    setActiveUser(null);
    setToken("");
  };

  return (
    <div className="vulnerability-page">
      <div className="vulnerability-header">
        <h1>Broken Access Control — Interactive Demo</h1>
        <p>
          Login as different users and try accessing restricted data. Observe how improper access control can let attackers bypass permissions.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto 2rem auto', padding: '1.5rem', background: 'rgba(255,205,88,0.05)', borderRadius: '12px', border: '1px solid rgba(255,205,88,0.2)' }}>
        <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
        <p style={{ fontSize: '15px', color: '#d1d5db', marginBottom: '1rem' }}>
          Bypass access controls and view data that shouldn't be visible to you.
        </p>
        <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li><strong>Authenticate:</strong> Click 🔐 Login as Alice. She is a low-privileged user.</li>
          <li><strong>Unauthorized Access:</strong> Click 📄 Try accessing another user's document. Note the result—if Alice can see Bob's data, the access control is <i>broken</i>.</li>
          <li><strong>Compare Roles:</strong> Restart the demo and login as Bob. Try accessing Alice's document to see if the vulnerability is consistent.</li>
        </ol>
      </div>

      <div className="sandbox-controls">
        <h2>🔧 Actions</h2>

        <div className="sandbox-buttons">
          <button
            className={`frontend-btn ${activeUser === "alice" ? "active" : ""
              }`}
            onClick={() => login("alice", "password1")}
          >
            🔐 Login as Alice
          </button>

          <button
            className={`frontend-btn ${activeUser === "bob" ? "active" : ""
              }`}
            onClick={() => login("bob", "password2")}
          >
            🔐 Login as Bob
          </button>

          <button
            className="frontend-btn"
            disabled={!activeUser}
            onClick={() =>
              accessDoc(activeUser === "alice" ? 2 : 1)
            }
          >
            📄 Try accessing another user’s document
          </button>

          <button className="frontend-btn secondary" onClick={clearConsole}>
            🧹 Clear Console
          </button>

          <button className="frontend-btn danger" onClick={restartDemo}>
            🔁 Restart Demo
          </button>
        </div>
      </div>

      <div className="sandbox-results">
        <h2>🧪 Results & Explanations</h2>
        {logs.length === 0 ? (
          <p className="no-logs">No actions yet. Start by logging in.</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="log-row">
              <div className="log-left">
                <h3>{log.title}</h3>
                <pre>{log.result}</pre>
              </div>
              <div className="log-right">
                <p>{log.explanation}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="vulnerability-footer">
        <button className="frontend-btn secondary" onClick={() => navigate(-1)}>
          ⬅️ Back to Overview
        </button>
      </div>
    </div >
  );
};

export default BrokenAccessControlSandbox;

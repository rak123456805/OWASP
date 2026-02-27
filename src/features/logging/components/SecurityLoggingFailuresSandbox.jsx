import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import '../../broken-access-control/assets/BrokenAccessControl.css';
import { getApiUrl } from '../../../config/api';

export default function SecurityLoggingFailuresSandbox() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [systemStatus, setSystemStatus] = useState("Operational");
    const consoleRef = useRef(null);

    async function call(route, method = "POST", body = {}) {
        setLoading(true);
        try {
            const res = await fetch(getApiUrl(5600, `/api/${route}`), {
                method,
                headers: { "Content-Type": "application/json" },
                body: method === "POST" ? JSON.stringify(body) : undefined,
            });

            const data = await res.json();
            setResult(data);

            // Reactive status
            if (route === "delete-logs") setSystemStatus("🚨 COMPROMISED");
            else if (route === "weak-logging") setSystemStatus("⚠️ VULNERABLE");
            else if (route === "view-logs") setSystemStatus("Operational");

        } catch (err) {
            setResult({ error: "Failed to connect to the logging server.", details: err.message });
        } finally {
            setLoading(false);
        }
    }

    const renderLogs = (logText) => {
        if (!logText) return <div style={{ opacity: 0.5 }}>[System ready] Awaiting security events...</div>;

        const lines = logText.split('\n');
        return lines.map((line, i) => {
            let color = '#d1d5db';
            if (line.includes('[WEAK LOG]')) color = '#ffcd58'; // Warning
            else if (line.includes('Deleted by Attacker')) color = '#ff4d4d'; // Critical
            else if (line.includes('===')) color = '#00ff88'; // Header

            return (
                <div key={i} style={{ color, marginBottom: '2px' }}>
                    {line}
                </div>
            );
        });
    };

    // Auto-scroll log panel
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [result]);

    return (
        <div className="broken-access-page">
            <section className="bac-hero">
                <div className="bac-hero-content">
                    <div className="bac-hero-text">
                        <div className="bac-badge">A09:2021</div>
                        <h1 className="bac-title">Security Logging & Monitoring Sandbox</h1>
                        <p className="bac-subtitle">
                            Simulate security events, detect log tampering, and understand the impact of insufficient monitoring.
                        </p>
                        <button
                            className="vp-btn vp-btn-secondary"
                            onClick={() => navigate('/security-logging-failures')}
                            style={{ marginTop: '1rem' }}
                        >
                            Back to Overview
                        </button>
                    </div>
                </div>
            </section>

            <main className="vp-container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <div className="vp-grid" style={{ maxWidth: 1200, gap: 24, gridTemplateColumns: '1.5fr 1fr' }}>
                    {/* Log Panel */}
                    <div className="vp-card" style={{ flex: 1, minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <h3 style={{ margin: 0 }}>🛡️ System Logs</h3>
                                <div style={{
                                    padding: '2px 10px',
                                    borderRadius: '20px',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    background: systemStatus.includes('🚨') ? '#ff4d4d' : systemStatus.includes('⚠️') ? '#ffcd58' : '#00ff88',
                                    color: '#000'
                                }}>
                                    {systemStatus}
                                </div>
                            </div>
                            <button className="vp-btn vp-btn-secondary" onClick={() => { setResult(null); setSystemStatus("Operational"); }} style={{ padding: '4px 12px', fontSize: '12px' }}>
                                Reset Terminal
                            </button>
                        </div>
                        <div
                            ref={consoleRef}
                            style={{
                                background: '#0b1020',
                                color: '#d1d5db',
                                fontFamily: 'ui-monospace, Menlo, Monaco, monospace',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                flex: 1,
                                overflowY: 'auto',
                                border: '1px solid rgba(255,255,255,0.05)',
                                fontSize: '13px',
                                lineHeight: '1.5',
                                whiteSpace: 'pre-wrap'
                            }}
                        >
                            {result ? renderLogs(typeof result.logs === "string" ? result.logs.replace(/\\n/g, "\n") : JSON.stringify(result, null, 2)) : renderLogs(null)}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="vp-card">
                        <div style={{ marginBottom: '2rem', padding: '1.2rem', background: 'rgba(255,205,88,0.05)', borderRadius: '12px', border: '1px solid rgba(255,205,88,0.2)' }}>
                            <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
                            <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                <li><strong>Missing Evidence:</strong> Click <b>"🔓 Login (No Logging)"</b>. Check the terminal—it's empty! This is how attackers hide.</li>
                                <li><strong>Leak Secrets:</strong> Click <b>"⚠️ Weak Logging"</b>. Then click <b>"🔍 Refresh Log File"</b>. See your password in plain text in the terminal.</li>
                                <li><strong>Cover Tracks:</strong> Click <b>"🗑️ Tamper Logs"</b>. Notice the <b>🚨 COMPROMISED</b> status and the wiped terminal.</li>
                            </ol>
                        </div>

                        <h3>🔧 Attack Simulation</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button
                                className="vp-btn"
                                onClick={() => call("no-logging-login", "POST", { username: "admin", password: "admin123" })}
                                disabled={loading}
                            >
                                🔓 Login (No Logging)
                            </button>

                            <button
                                className="vp-btn"
                                onClick={() => call("weak-logging", "POST", { username: "test", password: "password123" })}
                                disabled={loading}
                            >
                                ⚠️ Weak Logging (Leaks Passwords)
                            </button>

                            <button
                                className="vp-btn vp-btn-danger"
                                onClick={() => call("delete-logs")}
                                disabled={loading}
                            >
                                🗑️ Tamper Logs (Delete All)
                            </button>

                            <button
                                className="vp-btn vp-btn-secondary"
                                onClick={() => call("view-logs", "GET")}
                                disabled={loading}
                                style={{ marginTop: '1rem' }}
                            >
                                🔍 Refresh/View Log File
                            </button>
                        </div>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                            <h4>💡 Why this matters</h4>
                            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
                                Logging isn't just about recording errors. It's about recording **intention**. Without proper logs, you can never know who accessed what data or when an attack started.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

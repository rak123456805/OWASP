import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import '../../broken-access-control/assets/BrokenAccessControl.css';
import { getApiUrl } from '../../../config/api';

export default function ServerSideRequestForgerySandbox() {
    const navigate = useNavigate();
    const [targetUrl, setTargetUrl] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const consoleRef = useRef(null);

    async function sendRequest() {
        if (!targetUrl) return;
        setLoading(true);
        try {
            const res = await fetch(getApiUrl(5500, "/api/ssrf"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: targetUrl }),
            });

            const result = await res.json();
            setResponse(result);
        } catch (err) {
            setResponse({ error: "Fetch failed", details: String(err) });
        } finally {
            setLoading(false);
        }
    }

    // Auto-scroll
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [response]);

    return (
        <div className="broken-access-page">
            <section className="bac-hero">
                <div className="bac-hero-content">
                    <div className="bac-hero-text">
                        <div className="bac-badge">A10:2021</div>
                        <h1 className="bac-title">Server-Side Request Forgery Sandbox</h1>
                        <p className="bac-subtitle">
                            Abuse the server to make requests on your behalf to internal systems or cloud metadata services.
                        </p>
                        <button
                            className="vp-btn vp-btn-secondary"
                            onClick={() => navigate('/server-side-request-forgery')}
                            style={{ marginTop: '1rem' }}
                        >
                            Back to Overview
                        </button>
                    </div>
                </div>
            </section>

            <main className="vp-container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <div className="vp-grid" style={{ maxWidth: 1200, gap: 24, gridTemplateColumns: '1.2fr 1.8fr' }}>

                    {/* Controls */}
                    <div className="vp-card">
                        <div style={{ marginBottom: '2rem', padding: '1.2rem', background: 'rgba(255,205,88,0.05)', borderRadius: '12px', border: '1px solid rgba(255,205,88,0.2)' }}>
                            <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
                            <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                <li><strong>Scan Internal Services:</strong> Click on <code>{getApiUrl(4000)}</code> or <code>{getApiUrl(5001)}</code>. Observe how the server fetches data from <i>its own</i> local environment.</li>
                                <li><strong>Cloud Metadata Attack:</strong> Click on the red <code>169.254.169.254</code> payload. In a real cloud environment, this would return sensitive IAM roles and secrets.</li>
                                <li><strong>Arbitrary Fetching:</strong> Type any URL (e.g., <code>https://google.com</code>) into the input box and click send. See the raw HTML/JSON response in the terminal.</li>
                            </ol>
                        </div>

                        <h3>🔗 Fetch Internal Resource</h3>
                        <p className="vp-note" style={{ marginBottom: '1.5rem' }}>
                            The server will attempt to fetch data from the URL you provide. Try accessing internal services or cloud metadata.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Target URL</label>
                                <input
                                    type="text"
                                    className="vp-input"
                                    placeholder={`e.g., http://localhost:4000`}
                                    value={targetUrl}
                                    onChange={(e) => setTargetUrl(e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <button
                                className="vp-btn vp-btn-danger"
                                onClick={sendRequest}
                                disabled={loading || !targetUrl}
                            >
                                {loading ? "Fetching..." : "🚀 Send Request (Vulnerable)"}
                            </button>

                            <div style={{ marginTop: '1rem' }}>
                                <h4 style={{ fontSize: '15px', color: '#ffcd58', marginBottom: '10px' }}>Example Payloads:</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <code
                                        onClick={() => setTargetUrl(getApiUrl(4000))}
                                        style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '4px', fontSize: '12px', border: '1px solid #444' }}
                                    >
                                        {getApiUrl(4000)} (Frontend)
                                    </code>
                                    <code
                                        onClick={() => setTargetUrl(getApiUrl(5001))}
                                        style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '4px', fontSize: '12px', border: '1px solid #444' }}
                                    >
                                        {getApiUrl(5001)} (Crypto Server)
                                    </code>
                                    <code
                                        onClick={() => setTargetUrl('http://169.254.169.254/latest/meta-data/')}
                                        style={{ cursor: 'pointer', background: 'rgba(255,77,77,0.1)', padding: '6px', borderRadius: '4px', fontSize: '12px', border: '1px solid #ff4d4d' }}
                                    >
                                        http://169.254.169.254/latest/meta-data/
                                    </code>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem' }}>
                            <h4>🎓 SSD Explainer</h4>
                            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '0.5rem' }}>
                                In an SSRF attack, the attacker can cause the server-side application to make HTTP requests to an arbitrary domain of the attacker's choosing.
                            </p>
                        </div>
                    </div>

                    {/* Result Panel */}
                    <div className="vp-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>📟 Server Response</h3>
                            <button className="vp-btn vp-btn-secondary" onClick={() => setResponse(null)} style={{ padding: '4px 12px', fontSize: '12px' }}>
                                Clear
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
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                whiteSpace: 'pre-wrap'
                            }}
                        >
                            {response ? (
                                JSON.stringify(response, null, 2)
                            ) : (
                                <div style={{ opacity: 0.5 }}>Waiting for server output...</div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import '../../broken-access-control/assets/BrokenAccessControl.css';
import { getApiUrl } from '../../../config/api';

export default function VulnerableComponentsSandbox() {
    const navigate = useNavigate();
    const [auditData, setAuditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function runAudit() {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(getApiUrl(5002, "/api/data"));
            const data = await res.json();
            setAuditData({
                backendResponse: data,
                vulnerabilities: [
                    { name: "express", version: "4.16.0", latest: "4.18.2", risk: "High", cve: "CVE-2022-24999", description: "Open redirect and Prototype pollution", patched: false },
                    { name: "body-parser", version: "1.18.3", latest: "1.20.1", risk: "Medium", cve: "CVE-2019-10744", description: "Prototype pollution in query parser", patched: false },
                    { name: "cors", version: "2.8.1", latest: "2.8.5", risk: "Low", cve: "CVE-2020-11222", description: "Permissive CORS configuration", patched: false }
                ]
            });
        } catch (err) {
            setError(true);
            setAuditData({ error: "Failed to connect to vulnerable backend server." });
        } finally {
            setLoading(false);
        }
    }

    const fixVulnerability = (name) => {
        setAuditData(prev => ({
            ...prev,
            vulnerabilities: prev.vulnerabilities.map(v =>
                v.name === name ? { ...v, patched: true, version: v.latest, risk: "Patched" } : v
            )
        }));
    };

    useEffect(() => {
        runAudit();
    }, []);

    return (
        <div className="broken-access-page">
            <section className="bac-hero">
                <div className="bac-hero-content">
                    <div className="bac-hero-text">
                        <div className="bac-badge">A06:2021</div>
                        <h1 className="bac-title">Vulnerable Components Sandbox</h1>
                        <p className="bac-subtitle">
                            Scan your dependencies for known vulnerabilities and understand the risks of using outdated software libraries.
                        </p>
                        <button
                            className="vp-btn vp-btn-secondary"
                            onClick={() => navigate('/vulnerable-components')}
                            style={{ marginTop: '1rem' }}
                        >
                            Back to Overview
                        </button>
                    </div>
                </div>
            </section>

            <main className="vp-container" style={{ padding: '2rem 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto 2rem auto', padding: '1.5rem', background: 'rgba(255,205,88,0.05)', borderRadius: '12px', border: '1px solid rgba(255,205,88,0.2)' }}>
                    <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
                    <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                        <li><strong>Run Audit:</strong> If the report isn't loaded, click <b>"Re-run Security Audit"</b> to identify vulnerable packages.</li>
                        <li><strong>Analyze:</strong> Notice the red versions on the left. These are unpatched. Check the <b>CVE</b> and <b>Risk</b> levels.</li>
                        <li><strong>Remediate:</strong> Click the <b>"🛠️ Apply Fix"</b> button on each vulnerability card. Watch as the version updates and the risk level changes to "Patched".</li>
                    </ol>
                </div>

                <div className="vp-grid" style={{ maxWidth: 1200, gap: 24, gridTemplateColumns: '1.2fr 1.8fr', margin: '0 auto' }}>

                    {/* Backend Status */}
                    <div className="vp-card">
                        <h3>🔌 Backend Status</h3>
                        <p className="vp-note" style={{ marginBottom: '1.5rem' }}>
                            The server running this demo is intentionally using unpatched, vulnerable dependencies.
                        </p>

                        <div
                            style={{
                                background: error ? 'rgba(255,77,77,0.1)' : 'rgba(0,255,136,0.1)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: error ? '1px solid #ff4d4d' : '1px solid #00ff88',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{error ? '❌' : '⚡'}</div>
                            <h4 style={{ margin: '0 0 10px 0', color: error ? '#ff4d4d' : '#00ff88' }}>
                                {error ? 'Connection Failed' : 'Vulnerable Server Active'}
                            </h4>
                            <p style={{ fontSize: '14px', opacity: 0.8 }}>
                                {auditData?.backendResponse?.message || (error ? 'Could not reach API' : 'Initializing...')}
                            </p>
                            <button
                                className="vp-btn vp-btn-secondary"
                                onClick={runAudit}
                                disabled={loading}
                                style={{ marginTop: '1rem', width: '100%' }}
                            >
                                {loading ? 'Scanning...' : 'Re-run Security Audit'}
                            </button>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h4>📦 Active Versions</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                                {(auditData?.vulnerabilities || []).map(v => (
                                    <div key={v.name} style={{ background: '#111', padding: '10px', borderRadius: '6px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{v.name}</span> <span style={{ color: v.patched ? '#00ff88' : '#ff4d4d' }}>{v.version}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Audit Results */}
                    <div className="vp-card">
                        <h3>🔍 Vulnerability Audit Report</h3>
                        <div style={{ marginTop: '1.5rem' }}>
                            {auditData?.vulnerabilities ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {auditData.vulnerabilities.map(v => (
                                        <div key={v.name} style={{ background: '#0b1020', border: v.patched ? '1px solid #00ff88' : '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem', transition: 'all 0.3s' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                <div>
                                                    <h4 style={{ margin: 0, color: v.patched ? '#00ff88' : '#ffcd58' }}>{v.name} {v.patched && "✓"}</h4>
                                                    <code style={{ fontSize: '11px', color: '#94a3b8' }}>{v.cve}</code>
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                    <span
                                                        style={{
                                                            background: v.patched ? '#00ff88' : (v.risk === 'High' ? '#ff4d4d' : v.risk === 'Medium' ? '#ffa500' : '#4d94ff'),
                                                            padding: '2px 8px',
                                                            borderRadius: '4px',
                                                            fontSize: '11px',
                                                            fontWeight: 'bold',
                                                            color: '#000'
                                                        }}
                                                    >
                                                        {v.risk}
                                                    </span>
                                                    {!v.patched && (
                                                        <button
                                                            className="vp-btn"
                                                            onClick={() => fixVulnerability(v.name)}
                                                            style={{ padding: '4px 10px', fontSize: '11px' }}
                                                        >
                                                            🛠️ Apply Fix
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '13px', color: '#d1d5db', margin: '10px 0' }}>{v.description}</p>
                                            <div style={{ fontSize: '12px', display: 'flex', gap: '15px', color: '#94a3b8' }}>
                                                <span>Current: <b style={{ color: v.patched ? '#00ff88' : '#ff4d4d' }}>{v.version}</b></span>
                                                <span>Latest: <b style={{ color: '#00ff88' }}>{v.latest}</b></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>
                                    {loading ? 'Performing analysis...' : 'No audit data available.'}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

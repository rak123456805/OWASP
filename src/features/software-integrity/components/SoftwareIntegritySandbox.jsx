import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import '../../broken-access-control/assets/BrokenAccessControl.css';
import { getApiUrl } from '../../../config/api';

export default function SoftwareIntegritySandbox() {
    const navigate = useNavigate();
    const [unsafeUpdate, setUnsafeUpdate] = useState(null);
    const [safeUpdate, setSafeUpdate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [isTampered, setIsTampered] = useState(false);

    async function fetchUpdates() {
        setLoading(true);
        setVerificationResult(null);
        setIsTampered(false);
        try {
            const [uResp, sResp] = await Promise.all([
                fetch(getApiUrl(5400, '/api/update')),
                fetch(getApiUrl(5400, '/api/update/signed'))
            ]);

            const uData = await uResp.json();
            const sData = await sResp.json();

            setUnsafeUpdate(uData);
            setSafeUpdate(sData);
        } catch (err) {
            setUnsafeUpdate({ error: "Failed to connect to integrity server." });
            setSafeUpdate({ error: "Failed to connect to integrity server." });
        } finally {
            setLoading(false);
        }
    }

    const tamperPayload = () => {
        if (!unsafeUpdate) return;
        setIsTampered(true);
        setUnsafeUpdate(prev => ({
            ...prev,
            payload: {
                ...prev.payload,
                version: "2.0.0-MALICIOUS",
                description: "Critical security patch (actually a backdoor)",
                checksum: "modified_checksum_000"
            }
        }));
    };

    const verifyIntegrity = (data, type) => {
        if (!data) return;
        if (type === 'safe' && data.signature) {
            setVerificationResult({
                success: true,
                message: "✅ Integrity Verified! Digital signature matches the payload.",
                details: `Origin: SoftwareSim Trusted CA\nAlgorithm: RSA-SHA256\nStatus: Secure`
            });
        } else {
            setVerificationResult({
                success: false,
                message: "🚨 INTEGRITY FAILURE!",
                details: type === 'safe' ? "Signature missing or invalid!" : "This update has NO digital signature. It cannot be verified and should be treated as MALICIOUS."
            });
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, []);

    return (
        <div className="broken-access-page">
            <section className="bac-hero">
                <div className="bac-hero-content">
                    <div className="bac-hero-text">
                        <div className="bac-badge">A08:2021</div>
                        <h1 className="bac-title">Software & Data Integrity Sandbox</h1>
                        <p className="bac-subtitle">
                            Compare signed vs. unsigned updates to understand how attackers inject malicious code into software supply chains.
                        </p>
                        <button
                            className="vp-btn vp-btn-secondary"
                            onClick={() => navigate('/software-data-integrity')}
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
                        <li><strong>Observe Defaults:</strong> Notice both updates have original data. Click <b>"Verify Integrity"</b> on both to see the difference.</li>
                        <li><strong>Attack:</strong> Click <b>"😈 Tamper with Payload"</b> on the Red card. You just successfully modified the update without any security warning!</li>
                        <li><strong>Defend:</strong> Look at the Green card (Signed). It has a cryptographic <code>signature</code>. This allows clients to verify that the code hasn't changed.</li>
                    </ol>
                </div>

                {verificationResult && (
                    <div style={{
                        maxWidth: 1200,
                        margin: '0 auto 2rem auto',
                        padding: '1.5rem',
                        background: verificationResult.success ? 'rgba(0,255,136,0.1)' : 'rgba(255,77,77,0.1)',
                        borderRadius: '12px',
                        border: `1px solid ${verificationResult.success ? '#00ff88' : '#ff4d4d'}`,
                        textAlign: 'center'
                    }}>
                        <h2 style={{ color: verificationResult.success ? '#00ff88' : '#ff4d4d', margin: '0 0 10px 0' }}>{verificationResult.message}</h2>
                        <pre style={{ fontSize: '14px', color: '#d1d5db', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px' }}>{verificationResult.details}</pre>
                        <button className="vp-btn vp-btn-secondary" onClick={() => setVerificationResult(null)} style={{ marginTop: '10px' }}>Dismiss</button>
                    </div>
                )}

                <div className="vp-grid" style={{ maxWidth: 1200, gap: 24, gridTemplateColumns: '1fr 1fr', margin: '0 auto' }}>

                    {/* Unsafe Update */}
                    <div className="vp-card" style={{ borderTop: '4px solid #ff4d4d', position: 'relative' }}>
                        {isTampered && <div style={{ position: 'absolute', top: 10, right: 10, background: '#ff4d4d', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>TAMPERED</div>}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, color: '#ff4d4d' }}>❌ Unsigned Update</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="vp-btn" onClick={tamperPayload} style={{ padding: '4px 12px', fontSize: '12px', background: 'rgba(255,77,77,0.2)' }}>
                                    😈 Tamper
                                </button>
                                <button className="vp-btn vp-btn-secondary" onClick={() => verifyIntegrity(unsafeUpdate, 'unsafe')} style={{ padding: '4px 12px', fontSize: '12px' }}>
                                    Verify
                                </button>
                            </div>
                        </div>
                        <p className="vp-note">
                            This update package has no digital signature. Any field can be modified silently.
                        </p>
                        <div
                            style={{
                                background: '#0b1020',
                                color: '#d1d5db',
                                fontFamily: 'ui-monospace, Menlo, Monaco, monospace',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                minHeight: '300px',
                                overflow: 'auto',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '13px',
                                lineHeight: '1.6'
                            }}
                        >
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{unsafeUpdate ? JSON.stringify(unsafeUpdate, null, 2) : "// Awaiting data..."}</pre>
                        </div>
                    </div>

                    {/* Safe Update */}
                    <div className="vp-card" style={{ borderTop: '4px solid #00ff88' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, color: '#00ff88' }}>✅ Signed Update</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="vp-btn vp-btn-secondary" onClick={() => verifyIntegrity(safeUpdate, 'safe')} style={{ padding: '4px 12px', fontSize: '12px', background: 'rgba(0,255,136,0.2)', color: '#00ff88' }}>
                                    Verify Integrity
                                </button>
                                <button className="vp-btn vp-btn-secondary" onClick={fetchUpdates} style={{ padding: '4px 12px', fontSize: '12px' }}>
                                    Refresh
                                </button>
                            </div>
                        </div>
                        <p className="vp-note">
                            Includes a <code>signature</code>. If the payload is changed, verification will fail immediately.
                        </p>
                        <div
                            style={{
                                background: '#0b1020',
                                color: '#d1d5db',
                                fontFamily: 'ui-monospace, Menlo, Monaco, monospace',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                minHeight: '300px',
                                overflow: 'auto',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '13px',
                                lineHeight: '1.6'
                            }}
                        >
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{safeUpdate ? JSON.stringify(safeUpdate, null, 2) : "// Awaiting data..."}</pre>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

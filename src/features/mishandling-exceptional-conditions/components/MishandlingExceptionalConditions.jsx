import React from 'react';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import { useNavigate } from 'react-router-dom';

const MishandlingExceptionalConditions = () => {
    const navigate = useNavigate();

    const handleTryItYourself = () => {
        alert("Coming Soon! This interactive sandbox is still under processing.");
    };

    return (
        <div className="vulnerability-page">
            <section className="vp-hero">
                <div className="vp-hero-content">
                    <div className="vp-hero-text">
                        <div className="vp-badge">A10:2025</div>
                        <h1 className="vp-title">Mishandling of Exceptional Conditions</h1>
                        <p className="vp-subtitle">
                            Focuses on secure error handling, logical flaws, and insecure failure states that lead to sensitive data exposure or denial-of-service.
                        </p>
                        <div className="vp-stats">
                            <div className="vp-stat">
                                <span className="vp-stat-number">#10</span>
                                <span className="vp-stat-label">OWASP Rank (Draft)</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">High</span>
                                <span className="vp-stat-label">Impact</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">New</span>
                                <span className="vp-stat-label">Category 2025</span>
                            </div>
                        </div>
                    </div>
                    <div className="vp-hero-visual">
                        <div className="vp-security-icon">
                            <div className="vp-icon">⚠️</div>
                            <div className="vp-icon-text">Error Handling</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-overview">
                <div className="vp-container">
                    <h2>Exceptional Conditions Overview</h2>
                    <div className="vp-overview-grid">
                        <div className="vp-overview-content">
                            <p>
                                Mishandling of exceptional conditions occurs when an application fails to handle unexpected states or errors gracefully.
                                This can lead to "fail-open" scenarios where security checks are bypassed, or informative error messages that leak system internals.
                            </p>
                            <p>
                                In 2025, this category highlights the importance of robust error logic and ensuring that applications remain in a secure state even when things go wrong.
                            </p>
                            <div className="vp-impact-box">
                                <h4>🚨 Impact of Mishandling</h4>
                                <ul>
                                    <li>Sensitive information disclosure via verbose error messages</li>
                                    <li>Security bypass (failing open instead of closed)</li>
                                    <li>Resource exhaustion leading to Denial of Service (DoS)</li>
                                    <li>Inconsistent application state leading to logical flaws</li>
                                    <li>Bypassing rate limits or authentication through error states</li>
                                </ul>
                            </div>
                        </div>
                        <div className="vp-overview-visual">
                            <div className="vp-data-flow">
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">1</div>
                                    <div className="vp-step-content">
                                        <strong>Unexpected Input</strong>
                                        <span>System receives malformed or edge-case data</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">2</div>
                                    <div className="vp-step-content">
                                        <strong>Error Triggered</strong>
                                        <span>A runtime or logical exception occurs</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step vp-vulnerable">
                                    <div className="vp-step-number">3</div>
                                    <div className="vp-step-content">
                                        <strong>Weak Handling</strong>
                                        <span>Exception is poorly caught or leaks info</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">4</div>
                                    <div className="vp-step-content">
                                        <strong>Exploitation</strong>
                                        <span>Attacker leverages error state for malicious gain</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-vectors">
                <div className="vp-container">
                    <h2>Common Error Handling Vectors</h2>
                    <div className="vp-vectors-grid">
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">💬</div>
                            <h3>Verbose Error Details</h3>
                            <p>Returning stack traces, database schema details, or environment variables in HTTP responses.</p>
                            <div className="vp-vector-example">
                                <code>{`SQL Error at line 45: Column 'credit_card' not found in 'users' table`}</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">📂</div>
                            <h3>Insecure Failure (Fail Open)</h3>
                            <p>When a security check fails due to an error, the system defaults to allowing access rather than denying it.</p>
                            <div className="vp-vector-example">
                                <code>{`try { checkAuth(); } catch (e) { /* ignore error and continue */ }`}</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">⏳</div>
                            <h3>Resource Overload</h3>
                            <p>Triggering expensive error-handling logic or logging that consumes all system memory or CPU.</p>
                            <div className="vp-vector-example">
                                <code>Extensive recursive error logging</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">🧠</div>
                            <h3>Logical Error States</h3>
                            <p>Exploiting race conditions or unfinished state transitions that occur during exception handling.</p>
                            <div className="vp-vector-example">
                                <code>Incomplete transaction states</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prevention Section */}
            <section className="vp-section vp-prevention">
                <div className="vp-container">
                    <h2>Prevention & Mitigation Strategies</h2>
                    <div className="vp-prevention-grid">
                        <div className="vp-prevention-category">
                            <h3>🛡️ Secure Defaults</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Fail Securely</h4>
                                    <p>Design systems to default to a secure state (deny by default) if an error occurs.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Generic Error Messages</h4>
                                    <p>Provide helpful user-facing messages without revealing technical details.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔒 Robust Handling</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Centralized Management</h4>
                                    <p>Use global error handlers to ensure consistency and prevent leakage.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Secure Logging</h4>
                                    <p>Log detailed errors internally but never expose them to the end-user.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Examples */}
            <section className="vp-section vp-code">
                <div className="vp-container">
                    <h2>Secure Code Examples</h2>
                    <div className="vp-code-comparison">
                        <div className="vp-code-block vp-vulnerable">
                            <h4>❌ Vulnerable Error Handling</h4>
                            <pre>{`// UNSAFE: Leaking stack trace and internal details
app.get('/data', (req, res) => {
  try {
    const data = db.query('SELECT * FROM users');
    res.json(data);
  } catch (err) {
    // Leaks database schema and server paths
    res.status(500).send(err.stack); 
  }
});`}</pre>
                        </div>
                        <div className="vp-code-block vp-secure">
                            <h4>✅ Secure Error Handling</h4>
                            <pre>{`// SAFE: Generic errors and internal logging
app.get('/data', (req, res) => {
  try {
    const data = db.query('SELECT * FROM users');
    res.json(data);
  } catch (err) {
    console.error('Database Error:', err.message);
    // Generic message to user, private logs for dev
    res.status(500).send('An internal error occurred');
  }
});`}</pre>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={handleTryItYourself}
                >
                    Try it Yourself
                </button>
            </section>

            {/* Resources */}
            <section className="vp-section vp-resources">
                <div className="vp-container">
                    <h2>Additional Resources</h2>
                    <div className="vp-resources-grid">
                        <a href="https://owasp.org/www-community/Improper_Error_Handling" className="vp-resource-card">
                            <div className="vp-resource-icon">📚</div>
                            <h3>OWASP Error Handling</h3>
                            <p>Guide to secure error message design and handling</p>
                        </a>
                        <a href="https://cwe.mitre.org/data/definitions/754.html" className="vp-resource-card">
                            <div className="vp-resource-icon">🔍</div>
                            <h3>CWE-754</h3>
                            <p>Improper Check for Unusual or Exceptional Conditions</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MishandlingExceptionalConditions;

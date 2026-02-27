import React from 'react';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import { useNavigate } from 'react-router-dom';

const SoftwareSupplyChainFailures = () => {
    const navigate = useNavigate();

    const handleTryItYourself = () => {
        alert("Coming Soon! This interactive sandbox is still under processing.");
    };

    return (
        <div className="vulnerability-page">
            <section className="vp-hero">
                <div className="vp-hero-content">
                    <div className="vp-hero-text">
                        <div className="vp-badge">A03:2025</div>
                        <h1 className="vp-title">Software Supply Chain Failures</h1>
                        <p className="vp-subtitle">
                            Expands on vulnerable components to cover the entire software ecosystem, including dependencies, build systems, and distribution channels.
                        </p>
                        <div className="vp-stats">
                            <div className="vp-stat">
                                <span className="vp-stat-number">#3</span>
                                <span className="vp-stat-label">OWASP Rank (Draft)</span>
                            </div>
                            <div className="vp-stat">
                                <span className="vp-stat-number">Critical</span>
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
                            <div className="vp-icon">🛠️</div>
                            <div className="vp-icon-text">Supply Chain</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-overview">
                <div className="vp-container">
                    <h2>Software Supply Chain Risks</h2>
                    <div className="vp-overview-grid">
                        <div className="vp-overview-content">
                            <p>
                                Software supply chain failures occur when the integrity of software components, dependencies, or the development pipeline is compromised.
                                This new category for 2025 emphasizes that security isn't just about your own code, but everything that goes into building and delivering it.
                            </p>
                            <p>
                                Attackers target the weakest links in the chain: insecure third-party packages, compromised build servers, or unverified update mechanisms
                                to inject malicious code into otherwise trusted applications.
                            </p>
                            <div className="vp-impact-box">
                                <h4>🚨 Supply Chain Consequences</h4>
                                <ul>
                                    <li>Malicious code injection into production environments</li>
                                    <li>Widespread compromise of downstream users</li>
                                    <li>Data exfiltration through compromised dependencies</li>
                                    <li>Loss of trust in software distribution systems</li>
                                    <li>Bypassing traditional perimeter security</li>
                                </ul>
                            </div>
                        </div>
                        <div className="vp-overview-visual">
                            <div className="vp-data-flow">
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">1</div>
                                    <div className="vp-step-content">
                                        <strong>Dependency Source</strong>
                                        <span>External packages are imported</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">2</div>
                                    <div className="vp-step-content">
                                        <strong>Build Pipeline</strong>
                                        <span>Code is compiled and packaged</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step vp-vulnerable">
                                    <div className="vp-step-number">3</div>
                                    <div className="vp-step-content">
                                        <strong>Corruption</strong>
                                        <span>Malicious actor compromises the chain</span>
                                    </div>
                                </div>
                                <div className="vp-flow-step">
                                    <div className="vp-step-number">4</div>
                                    <div className="vp-step-content">
                                        <strong>Distribution</strong>
                                        <span>Compromised software reaches users</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="vp-section vp-vectors">
                <div className="vp-container">
                    <h2>Common Supply Chain Vectors</h2>
                    <div className="vp-vectors-grid">
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">📦</div>
                            <h3>Dependency Confusion</h3>
                            <p>Tricking a build system into pulling a malicious private-named package from a public repository.</p>
                            <div className="vp-vector-example">
                                <code>npm install @company/internal-pkg</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-high">
                            <div className="vp-vector-icon">⌨️</div>
                            <h3>Typosquatting</h3>
                            <p>Registering package names similar to popular ones, hoping developers make a typo during installation.</p>
                            <div className="vp-vector-example">
                                <code>pip install pythno-dateutil</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-critical">
                            <div className="vp-vector-icon">🏭</div>
                            <h3>Build System Compromise</h3>
                            <p>Infiltrating the CI/CD environment to inject malicious code during the build process.</p>
                            <div className="vp-vector-example">
                                <code>Modified Jenkins plugins or GitHub Actions</code>
                            </div>
                        </div>
                        <div className="vp-vector-card vp-medium">
                            <div className="vp-vector-icon">🔑</div>
                            <h3>Stolen Developer Keys</h3>
                            <p>Using leaked or stolen credentials to push malicious updates to legitimate repositories.</p>
                            <div className="vp-vector-example">
                                <code>Compromised NPM or PyPI accounts</code>
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
                            <h3>🛡️ Dependency Management</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>SBOM (Software Bill of Materials)</h4>
                                    <p>Maintain an inventory of all third-party components and their versions.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Package Mirroring</h4>
                                    <p>Use internal mirrors or proxies to vet and host approved packages.</p>
                                </div>
                            </div>
                        </div>
                        <div className="vp-prevention-category">
                            <h3>🔒 Pipeline Security</h3>
                            <div className="vp-strategy-list">
                                <div className="vp-strategy">
                                    <h4>Signed Commits</h4>
                                    <p>Require developers to sign their commits to ensure authenticity.</p>
                                </div>
                                <div className="vp-strategy">
                                    <h4>Reproducible Builds</h4>
                                    <p>Ensure that builds are deterministic and can be verified independently.</p>
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
                            <h4>❌ Vulnerable Supply Chain</h4>
                            <pre>{`// UNSAFE: Using dependencies without version locking
// and trusting public registries blindly
{
  "dependencies": {
    "useful-library": "latest",
    "internal-pkg": "*"
  }
}

// UNSAFE: Installing packages without integrity checks
npm install somelib --no-save`}</pre>
                        </div>
                        <div className="vp-code-block vp-secure">
                            <h4>✅ Secure Supply Chain</h4>
                            <pre>{`// SAFE: Using lockfiles and specific versions
// to ensure deterministic builds (package-lock.json)
{
  "dependencies": {
    "useful-library": "1.2.3",
    "@company/internal-pkg": "npm:@company/internal-pkg@1.0.0"
  }
}

// SAFE: Running audits and verifying checksums
npm audit
npm install --ignore-scripts # Prevent lifecycle malware`}</pre>
                        </div>
                    </div>
                </div>

                <div className="vp-try-btn-wrapper">
                    <button
                        type="button"
                        className="vp-try-it-btn"
                        onClick={handleTryItYourself}
                    >
                        🚀 Try it Yourself
                    </button>
                </div>
            </section>

            {/* Resources */}
            <section className="vp-section vp-resources">
                <div className="vp-container">
                    <h2>Additional Resources</h2>
                    <div className="vp-resources-grid">
                        <a href="https://owasp.org/www-project-top-10/" className="vp-resource-card">
                            <div className="vp-resource-icon">📚</div>
                            <h3>OWASP Top 10:2025</h3>
                            <p>Latest updates on the OWASP Top 10 drafting process</p>
                        </a>
                        <a href="https://slsa.dev/" className="vp-resource-card">
                            <div className="vp-resource-icon">🏗️</div>
                            <h3>SLSA Framework</h3>
                            <p>Supply-chain Levels for Software Artifacts</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SoftwareSupplyChainFailures;

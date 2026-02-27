import React from 'react';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import { useNavigate } from 'react-router-dom';

const SecurityMisconfiguration = () => {
  const navigate = useNavigate();

  // Code samples displayed as literal text — no runtime env lookups
  const insecureConfig = `# UNSAFE: Default credentials
spring.datasource.username=sa
spring.datasource.password=

# UNSAFE: Verbose errors
server.error.include-stacktrace=always
server.error.include-message=always

# UNSAFE: Development settings in production
spring.h2.console.enabled=true
spring.jpa.show-sql=true

# UNSAFE: Weak security headers / Directory listing
server.servlet.session.cookie.http-only=false
Options +Indexes
`;

  const secureConfig = `# SECURE: Strong credentials (use an environment variable on the server)
spring.datasource.username=app_user
spring.datasource.password=\${DB_PASSWORD}

# SECURE: Generic errors
server.error.include-stacktrace=never
server.error.include-message=on_param

# SECURE: Production hardening
spring.h2.console.enabled=false
spring.jpa.show-sql=false

# SECURE: Security headers (set these at the server/proxy level)
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.secure=true
security.headers.hsts=max-age=31536000

# SECURE: Disable directory listing
Options -Indexes
`;

  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A05:2021</div>
            <h1 className="vp-title">Security Misconfiguration</h1>
            <p className="vp-subtitle">
              Insecure configurations in any part of the application stack, from network services to platform settings.
              The most commonly seen issue across applications and systems.
            </p>

            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#5</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">90%</span>
                <span className="vp-stat-label">Apps Affected</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Medium</span>
                <span className="vp-stat-label">Impact</span>
              </div>
            </div>
          </div>

          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">⚙️</div>
              <div className="vp-icon-text">Configuration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Configuration Security Risks</h2>

          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Security misconfiguration occurs when security settings remain at default, are incomplete,
                or are misconfigured. This includes unnecessary features, default accounts, verbose errors,
                open cloud storage, and weak permissions.
              </p>

              <p>
                Misconfigurations span the entire stack — server, database, application, cloud, containers,
                and custom code. Automated scanners help but cannot catch everything.
              </p>

              <div className="vp-impact-box">
                <h4>🚨 Configuration Risks</h4>
                <ul>
                  <li>Unauthorized access to system data or functionality</li>
                  <li>Full system compromise through default credentials</li>
                  <li>Information leakage via verbose error messages</li>
                  <li>Denial of service through misconfigured components</li>
                  <li>Compliance and audit violations</li>
                </ul>
              </div>
            </div>

            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Default Installation</strong>
                    <span>System installed with default settings</span>
                  </div>
                </div>

                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>No Hardening</strong>
                    <span>Security hardening not performed</span>
                  </div>
                </div>

                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>Misconfiguration</strong>
                    <span>Insecure settings left in place</span>
                  </div>
                </div>

                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Exploitation</strong>
                    <span>Attackers exploit weak configuration</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Misconfiguration Types */}
      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Misconfiguration Types</h2>

          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔓</div>
              <h3>Default Credentials</h3>
              <p>Systems left with default usernames and passwords.</p>
              <div className="vp-vector-example"><code>admin/admin</code></div>
            </div>

            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📝</div>
              <h3>Verbose Error Messages</h3>
              <p>Applications leaking stack traces or SQL queries.</p>
            </div>

            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📁</div>
              <h3>Directory Listing</h3>
              <p>Web servers showing directory contents.</p>
            </div>

            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🚫</div>
              <h3>Unnecessary Features</h3>
              <p>Unused services or debug endpoints left open.</p>
            </div>

            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🌐</div>
              <h3>Insecure Headers</h3>
              <p>Missing HSTS, CSP, X-Frame-Options, etc.</p>
            </div>

            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">☁️</div>
              <h3>Cloud Misconfigurations</h3>
              <p>Public cloud buckets or weak IAM permissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Misconfiguration Breaches</h2>

          <div className="vp-examples-timeline">

            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2022</div>
              <div className="vp-timeline-content">
                <h4>Microsoft Power Apps Exposure</h4>
                <p>38M records leaked due to misconfigured OData APIs.</p>
              </div>
            </div>

            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2021</div>
              <div className="vp-timeline-content">
                <h4>Volkswagen & Audi Leak</h4>
                <p>3.3M customer details exposed from cloud storage.</p>
              </div>
            </div>

            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>First American Financial Corp</h4>
                <p>885M sensitive documents accessible due to misconfigured application.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>Prevention & Hardening Strategies</h2>

          <div className="vp-prevention-grid">

            <div className="vp-prevention-category">
              <h3>🛡️ Secure Configuration</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy"><h4>Hardened Baselines</h4></div>
                <div className="vp-strategy"><h4>Automated Deployment</h4></div>
                <div className="vp-strategy"><h4>Least Privilege</h4></div>
              </div>
            </div>

            <div className="vp-prevention-category">
              <h3>🔍 Continuous Monitoring</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy"><h4>Configuration Scanning</h4></div>
                <div className="vp-strategy"><h4>Change Management</h4></div>
                <div className="vp-strategy"><h4>Audit Logging</h4></div>
              </div>
            </div>

            <div className="vp-prevention-category">
              <h3>⚙️ Security Controls</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy"><h4>Security Headers</h4></div>
                <div className="vp-strategy"><h4>Error Handling</h4></div>
                <div className="vp-strategy"><h4>Regular Updates</h4></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="vp-section vp-code">
        <div className="vp-container">
          <h2>Secure Configuration Examples</h2>

          <div className="vp-code-comparison">

            <div className="vp-code-block vp-vulnerable" aria-live="polite">
              <h4>❌ Insecure Configuration</h4>
              <pre>{insecureConfig}</pre>
            </div>

            <div className="vp-code-block vp-secure" aria-live="polite">
              <h4>✅ Secure Configuration (server-side)</h4>
              <pre>{secureConfig}</pre>
              <p className="vp-note">
                <strong>Note:</strong> Never embed secrets in client-side code. The placeholder <code>${'{'}DB_PASSWORD{'}'}</code> above
                represents a server-side environment variable — set and read it on the server or during deployment.
              </p>
            </div>

          </div>
        </div>

        {/* Standardized Try it Yourself Button */}
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate('/security-misconfiguration/sandbox')}
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
            <a className="vp-resource-card" href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/" rel="noreferrer" target="_blank">
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Security Configuration Guide</h3>
            </a>

            <a className="vp-resource-card" href="https://cheatsheetseries.owasp.org/cheatsheets/Security_Headers_Cheat_Sheet.html" rel="noreferrer" target="_blank">
              <div className="vp-resource-icon">🛡️</div>
              <h3>Security Headers Cheat Sheet</h3>
            </a>

            <a className="vp-resource-card" href="https://www.cisecurity.org/cis-benchmarks/" rel="noreferrer" target="_blank">
              <div className="vp-resource-icon">🔍</div>
              <h3>CIS Benchmarks</h3>
            </a>

            <a className="vp-resource-card" href="https://cwe.mitre.org/data/definitions/16.html" rel="noreferrer" target="_blank">
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-16: Configuration</h3>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SecurityMisconfiguration;

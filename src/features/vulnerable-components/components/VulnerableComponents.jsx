import { useNavigate } from "react-router-dom";
import React from "react";
import "../assets/VulnerabilityPage.css";

const VulnerableComponents = () => {
  const navigate = useNavigate();

  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A06:2021</div>
            <h1 className="vp-title">Vulnerable Components</h1>
            <p className="vp-subtitle">
              Using components with known vulnerabilities that can be exploited
              to compromise applications. This includes libraries, frameworks,
              and other software modules with unpatched security flaws.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#6</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">95%</span>
                <span className="vp-stat-label">Apps Affected</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">High</span>
                <span className="vp-stat-label">Impact</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">📦</div>
              <div className="vp-icon-text">Third-Party Risk</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Third-Party Component Risks</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Modern applications heavily rely on third-party components like
                libraries, frameworks, and software modules. When these
                components contain known vulnerabilities, they become easy
                targets for attackers. You are likely vulnerable if you don't
                know the versions of all components you use, if components are
                unsupported or outdated, or if you don't scan for
                vulnerabilities regularly.
              </p>
              <p>
                Software composition analysis (SCA) tools can help, but they are
                only effective if used consistently and if the organization has
                a process to respond to the findings. The risk is amplified when
                components run with full privileges, have deep integration into
                the application, or are difficult to update.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Component Risk Impacts</h4>
                <ul>
                  <li>Remote code execution through vulnerable dependencies</li>
                  <li>Data breaches via compromised third-party libraries</li>
                  <li>Supply chain attacks affecting multiple organizations</li>
                  <li>
                    Compliance violations due to unpatched vulnerabilities
                  </li>
                  <li>Reputation damage from preventable security incidents</li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Dependency Inclusion</strong>
                    <span>Application includes third-party components</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>Vulnerability Discovery</strong>
                    <span>Security flaw found in component</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>No Patching</strong>
                    <span>
                      Organization fails to update vulnerable component
                    </span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Exploitation</strong>
                    <span>Attackers exploit known vulnerability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Vulnerable Component Types</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔄</div>
              <h3>Framework Vulnerabilities</h3>
              <p>
                Security flaws in popular frameworks like Spring, Express.js,
                Django, or Ruby on Rails that affect all applications using
                them.
              </p>
              <div className="vp-vector-example">
                <code>Spring Framework RCE (CVE-2022-22965)</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📚</div>
              <h3>Library Dependencies</h3>
              <p>
                Vulnerabilities in utility libraries for logging, serialization,
                XML parsing, or image processing.
              </p>
              <div className="vp-vector-example">
                <code>Log4Shell (CVE-2021-44228)</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🗄️</div>
              <h3>Database Drivers</h3>
              <p>
                Security issues in database connectors and ORM libraries that
                can lead to data exposure or system compromise.
              </p>
              <div className="vp-vector-example">
                <code>MySQL Connector/J vulnerabilities</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🖼️</div>
              <h3>UI Components</h3>
              <p>
                Vulnerabilities in frontend libraries, CSS frameworks, or
                JavaScript components that enable XSS or other client-side
                attacks.
              </p>
              <div className="vp-vector-example">
                <code>jQuery XSS vulnerabilities</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔌</div>
              <h3>Plugin Architecture</h3>
              <p>
                Security flaws in plugin systems that allow malicious or
                vulnerable plugins to compromise the entire application.
              </p>
              <div className="vp-vector-example">
                <code>WordPress plugin vulnerabilities</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📦</div>
              <h3>Container Images</h3>
              <p>
                Vulnerable base images or container layers that introduce
                security risks into containerized applications.
              </p>
              <div className="vp-vector-example">
                <code>Alpine Linux package vulnerabilities</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Component Breaches</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2021</div>
              <div className="vp-timeline-content">
                <h4>Log4Shell (CVE-2021-44228)</h4>
                <p>
                  Critical RCE vulnerability in Apache Log4j logging library
                  affected millions of applications worldwide, enabling complete
                  system takeover through log messages.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">Millions of Apps</span>
                  <span className="vp-impact-badge">Critical RCE</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2017</div>
              <div className="vp-timeline-content">
                <h4>Equifax Struts Vulnerability</h4>
                <p>
                  Failure to patch Apache Struts CVE-2017-5638 led to breach of
                  147 million consumer records, costing the company over $1.4
                  billion.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">147M Records</span>
                  <span className="vp-impact-badge">$1.4B Cost</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2016</div>
              <div className="vp-timeline-content">
                <h4>Heartbleed OpenSSL</h4>
                <p>
                  Buffer over-read vulnerability in OpenSSL cryptographic
                  library exposed private keys and sensitive memory contents
                  from millions of web servers.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">500K Servers</span>
                  <span className="vp-impact-badge">Crypto Breach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>Component Security Management</h2>
          <div className="vp-prevention-grid">
            <div className="vp-prevention-category">
              <h3>📋 Inventory & Visibility</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Software Bill of Materials</h4>
                  <p>
                    Maintain a complete inventory of all components and their
                    versions using SBOM.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Dependency Scanning</h4>
                  <p>
                    Use SCA tools to automatically identify all dependencies and
                    their known vulnerabilities.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>License Compliance</h4>
                  <p>
                    Track open-source licenses and ensure compliance with
                    organizational policies.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🛡️ Vulnerability Management</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Continuous Monitoring</h4>
                  <p>
                    Monitor vulnerability databases and security advisories for
                    all used components.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Patch Management</h4>
                  <p>
                    Establish processes for timely testing and deployment of
                    security patches.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Risk Assessment</h4>
                  <p>
                    Assess the risk of vulnerabilities based on exploitability
                    and business impact.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔒 Secure Procurement</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Vetted Sources</h4>
                  <p>
                    Only use components from trusted sources with good security
                    track records.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Security Requirements</h4>
                  <p>
                    Include security requirements in component selection and
                    procurement processes.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Supply Chain Security</h4>
                  <p>
                    Verify component integrity and authenticity through digital
                    signatures and hashes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="vp-section vp-code">
        <div className="vp-container">
          <h2>Secure Dependency Management</h2>
          <div className="vp-code-comparison">
            <div className="vp-code-block vp-vulnerable">
              <h4>❌ Vulnerable Dependency Management</h4>
              <pre>{`# UNSAFE: No version pinning
dependencies:
  spring-boot-starter-web:
  log4j-core:

# UNSAFE: Using vulnerable versions
<dependency>
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-core</artifactId>
  <version>2.14.1</version> <!-- Vulnerable to Log4Shell -->
</dependency>

# UNSAFE: No security scanning
# No CI/CD security checks
# No vulnerability monitoring

# UNSAFE: Automatic major updates
"dependencies": {
  "express": "^4.18.0"  # Automatic major version updates
}`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Secure Dependency Management</h4>
              <pre>{`# SECURE: Pinned versions with security updates
dependencies:
  spring-boot-starter-web: 2.7.0
  log4j-core: 2.17.1  # Patched version

# SECURE: Dependency vulnerability scanning
# GitHub Security Advisories
# Snyk/Dependabot integration
# OWASP Dependency Check

# SECURE: CI/CD security gates
- name: Dependency Check
  uses: dependency-check/Dependency-Check@main
  with:
    project: 'MyApp'
    format: 'HTML'

# SECURE: Automated security updates
"dependencies": {
  "express": "~4.18.2"  # Patch updates only
},
"devDependencies": {
  "snyk": "^1.1000.0"
}`}</pre>
            </div>
          </div>
        </div>
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate("/vulnerable-components/sandbox")}
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
            <a
              href="https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Dependency Management</h3>
              <p>Complete guide to managing vulnerable components</p>
            </a>
            <a
              href="https://owasp.org/www-project-dependency-check/"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🛡️</div>
              <h3>OWASP Dependency Check</h3>
              <p>Open-source SCA tool for vulnerability detection</p>
            </a>
            <a
              href="https://docs.github.com/en/code-security/supply-chain-security"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🔍</div>
              <h3>GitHub Supply Chain Security</h3>
              <p>Tools and practices for securing software supply chains</p>
            </a>
            <a
              href="https://cwe.mitre.org/data/definitions/1104.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-1104: Unmaintained Components</h3>
              <p>Common Weakness Enumeration for unmaintained software</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VulnerableComponents;

import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../vulnerable-components/assets/VulnerabilityPage.css';

const CryptographicFailures = () => {
  const navigate = useNavigate();
  return (
    <div className="vulnerability-page">
      {/* Hero Section */}
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A02:2021</div>
            <h1 className="vp-title">Cryptographic Failures</h1>
            <p className="vp-subtitle">
              Formerly known as "Sensitive Data Exposure," focuses on failures related to cryptography which often lead to exposure of sensitive data like passwords, credit cards, and health records.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#2</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">High</span>
                <span className="vp-stat-label">Severity</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Widespread</span>
                <span className="vp-stat-label">Prevalence</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">🔐</div>
              <div className="vp-icon-text">Data Encryption</div>
            </div>
          </div>
        </div>
        <div className="vp-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="vp-scroll-arrow"></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Understanding Cryptographic Failures</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Cryptographic failures occur when sensitive data is not properly protected through encryption,
                leading to exposure of passwords, credit card numbers, health records, and other confidential information.
                This category focuses on failures related to cryptography rather than the cryptographic vulnerabilities themselves.
              </p>
              <p>
                The first thing is to determine the protection needs of data in transit and at rest. For example,
                passwords, credit card numbers, health records, personal information, and business secrets require extra protection,
                mainly if that data falls under privacy laws.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Critical Business Impacts</h4>
                <ul>
                  <li>Massive data breaches exposing user information</li>
                  <li>Identity theft and financial fraud</li>
                  <li>Regulatory compliance violations (GDPR, HIPAA, PCI DSS)</li>
                  <li>Reputation damage and loss of customer trust</li>
                  <li>Legal consequences and financial penalties</li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Sensitive Data Collection</strong>
                    <span>Passwords, credit cards, PII collected</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>Weak Protection</strong>
                    <span>Inadequate encryption or hashing</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>Data Exposure</strong>
                    <span>Attackers access unencrypted data</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Exploitation</strong>
                    <span>Data used for fraud and identity theft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Failures Section */}
      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Cryptographic Failures</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔓</div>
              <h3>Weak Encryption Algorithms</h3>
              <p>Using outdated algorithms like MD5, SHA-1, DES, or RC4 that can be easily broken with modern computing power.</p>
              <div className="vp-vector-example">
                <code>Using DES encryption instead of AES-256-GCM</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📧</div>
              <h3>Data in Transit Exposure</h3>
              <p>Failing to use TLS or using weak SSL/TLS configurations, deprecated protocols, or improper certificate validation.</p>
              <div className="vp-vector-example">
                <code>SSLv3 or TLS 1.0 instead of TLS 1.2+</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">💾</div>
              <h3>Data at Rest Exposure</h3>
              <p>Storing sensitive data without encryption or using weak encryption keys, poor key management, or hardcoded keys.</p>
              <div className="vp-vector-example">
                <code>Plain text passwords in database</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🔑</div>
              <h3>Weak Password Hashing</h3>
              <p>Using fast hashing algorithms without salt for passwords, making them vulnerable to rainbow table attacks.</p>
              <div className="vp-vector-example">
                <code>MD5(password) instead of bcrypt</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🔄</div>
              <h3>Insufficient Key Management</h3>
              <p>Poor key generation, storage, rotation, or distribution practices that compromise encryption security.</p>
              <div className="vp-vector-example">
                <code>Hardcoded encryption keys in source code</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🌐</div>
              <h3>Mixed Content Issues</h3>
              <p>Serving HTTPS pages that load resources over HTTP, creating security vulnerabilities in encrypted sessions.</p>
              <div className="vp-vector-example">
                <code>HTTPS page loading HTTP scripts</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Breach Examples</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>Capital One Data Breach</h4>
                <p>Attackers exploited a misconfigured web application firewall to access 100 million customer records stored in AWS S3 buckets with insufficient access controls.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">100M+ Records</span>
                  <span className="vp-impact-badge">$190M Fine</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2018</div>
              <div className="vp-timeline-content">
                <h4>Facebook Plain Text Passwords</h4>
                <p>Facebook stored hundreds of millions of user passwords in plain text, accessible to thousands of employees and engineers in internal data stores.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">600M Users</span>
                  <span className="vp-impact-badge">Plain Text</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2017</div>
              <div className="vp-timeline-content">
                <h4>Equifax Massive Breach</h4>
                <p>Failure to patch a known vulnerability in Apache Struts led to exposure of 147 million consumer records including Social Security numbers and credit card data.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">147M Records</span>
                  <span className="vp-impact-badge">$700M Settlement</span>
                </div>
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
              <h3>🛡️ Encryption Standards</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Use Strong Modern Algorithms</h4>
                  <p>Implement AES-256 for symmetric encryption, RSA-2048+ for asymmetric encryption, and SHA-256+ for hashing.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Proper TLS Configuration</h4>
                  <p>Enforce HTTPS with TLS 1.2+, disable weak ciphers, implement HSTS, and use secure certificate practices.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Secure Password Storage</h4>
                  <p>Use adaptive hashing algorithms like bcrypt, Argon2, or PBKDF2 with appropriate work factors and unique salts.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔑 Key Management</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Secure Key Storage</h4>
                  <p>Use hardware security modules (HSM), cloud KMS, or dedicated key management services for encryption keys.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Regular Key Rotation</h4>
                  <p>Implement automated key rotation policies and secure key distribution mechanisms.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Key Access Controls</h4>
                  <p>Enforce strict access controls and audit trails for all key management operations.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔍 Security Controls</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Data Classification</h4>
                  <p>Classify data based on sensitivity and apply appropriate encryption levels for each classification.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Secure Development</h4>
                  <p>Implement secure coding practices and use vetted cryptographic libraries instead of custom implementations.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Regular Audits</h4>
                  <p>Conduct regular security audits and penetration testing to identify cryptographic weaknesses.</p>
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
              <h4>❌ Vulnerable Code</h4>
              <pre>{`// UNSAFE: Weak password hashing
const passwordHash = crypto.createHash('md5')
  .update(password)
  .digest('hex');

// UNSAFE: HTTP for sensitive data
app.post('/login', (req, res) => {
  const userData = req.body; // Transmitted over HTTP
});

// UNSAFE: Plain text storage
db.users.insert({
  username: 'john',
  password: 'plaintext123' // Stored in plain text
});`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Secure Code</h4>
              <pre>{`// SAFE: Strong password hashing
const passwordHash = await bcrypt.hash(password, 12);

// SAFE: Enforce HTTPS
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));

// SAFE: Encrypted storage
const encryptedData = crypto.encrypt(
  sensitiveData, 
  process.env.ENCRYPTION_KEY
);

// SAFE: TLS for all connections
app.use(express.json());
app.use(helmet());`}</pre>
            </div>
          </div>
        </div>
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate("/cryptographic-failures/demo")}
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
            <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/" className="vp-resource-card">
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Official Documentation</h3>
              <p>Complete technical details and mitigation strategies for cryptographic failures</p>
            </a>
            <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html" className="vp-resource-card">
              <div className="vp-resource-icon">🛡️</div>
              <h3>Cryptographic Storage Cheat Sheet</h3>
              <p>Quick reference for secure data storage and encryption practices</p>
            </a>
            <a href="https://www.ssllabs.com/ssltest/" className="vp-resource-card">
              <div className="vp-resource-icon">🔍</div>
              <h3>SSL Labs Server Test</h3>
              <p>Free online service to test your SSL/TLS implementation</p>
            </a>
            <a href="https://cwe.mitre.org/data/definitions/327.html" className="vp-resource-card">
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-327: Broken Crypto</h3>
              <p>Common Weakness Enumeration for broken cryptographic algorithms</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CryptographicFailures;
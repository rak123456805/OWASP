import React from 'react';
import '../assets/BrokenAccessControl.css';
import { useNavigate } from "react-router-dom";

const BrokenAccessControl = () => {
  const navigate = useNavigate();
  return (

    <div className="broken-access-page">
      {/* Hero Section */}
      <section className="bac-hero">
        <div className="bac-hero-content">
          <div className="bac-hero-text">
            <div className="bac-badge">A01:2021</div>
            <h1 className="bac-title">Broken Access Control</h1>
            <p className="bac-subtitle">
              The #1 most critical web application security risk. Access control enforces policy so users cannot act outside of their intended permissions.
            </p>
            <div className="bac-stats">
              <div className="stat">
                <span className="stat-number">94%</span>
                <span className="stat-label">of applications</span>
              </div>
              <div className="stat">
                <span className="stat-number">#1</span>
                <span className="stat-label">OWASP Rank</span>
              </div>
              <div className="stat">
                <span className="stat-number">High</span>
                <span className="stat-label">Impact</span>
              </div>
            </div>
          </div>
          <div className="bac-hero-visual">
            <div className="security-shield">
              <div className="shield-icon">🛡️</div>
              <div className="shield-text">Access Control</div>
            </div>
          </div>
        </div>
        <div className="bac-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bac-section bac-overview">
        <div className="bac-container">
          <h2>What is Broken Access Control?</h2>
          <div className="overview-grid">
            <div className="overview-content">
              <p>
                Access control, sometimes called authorization, is how a web application grants access to content and functions to some users and not others. These checks are performed after authentication and govern what authenticated users are allowed to do.
              </p>
              <p>
                Broken Access Control vulnerabilities exist when an application does not properly enforce these restrictions, allowing attackers to bypass authorization and perform privileged actions.
              </p>
              <div className="impact-box">
                <h4>🚨 Business Impact</h4>
                <ul>
                  <li>Unauthorized access to sensitive data</li>
                  <li>User account takeover</li>
                  <li>Privilege escalation attacks</li>
                  <li>Data breach and compliance violations</li>
                  <li>Financial fraud and reputation damage</li>
                </ul>
              </div>
            </div>
            <div className="overview-visual">
              <div className="access-flow">
                <div className="flow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>User Authentication</strong>
                    <span>User logs into the system</span>
                  </div>
                </div>
                <div className="flow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Access Check</strong>
                    <span>System verifies permissions</span>
                  </div>
                </div>
                <div className="flow-step vulnerable">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Vulnerability Point</strong>
                    <span>Missing or broken access control</span>
                  </div>
                </div>
                <div className="flow-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <strong>Unauthorized Access</strong>
                    <span>Attacker bypasses restrictions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attack Vectors Section */}
      <section className="bac-section bac-vectors">
        <div className="bac-container">
          <h2>Common Attack Vectors</h2>
          <div className="vectors-grid">
            <div className="vector-card critical">
              <div className="vector-icon">🎯</div>
              <h3>IDOR Attacks</h3>
              <p>Insecure Direct Object References occur when an application uses user-supplied input to access objects directly.</p>
              <div className="vector-example">
                <code>GET /api/users/123 → GET /api/users/124</code>
              </div>
            </div>
            <div className="vector-card high">
              <div className="vector-icon">⬆️</div>
              <h3>Privilege Escalation</h3>
              <p>Vertical: Regular user gains admin privileges. Horizontal: User accesses another user's data.</p>
              <div className="vector-example">
                <code>User accesses /admin/panel without admin role</code>
              </div>
            </div>
            <div className="vector-card medium">
              <div className="vector-icon">📊</div>
              <h3>Metadata Manipulation</h3>
              <p>Modifying JWT tokens, cookies, or hidden fields to elevate privileges or impersonate users.</p>
              <div className="vector-example">
                <code>{"{role: 'user'} → {role: 'admin'}"}</code>
              </div>
            </div>
            <div className="vector-card high">
              <div className="vector-icon">🔗</div>
              <h3>Forceful Browsing</h3>
              <p>Accessing URLs directly that shouldn't be accessible without proper authorization checks.</p>
              <div className="vector-example">
                <code>Direct access to /api/internal/data</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="bac-section bac-examples">
        <div className="bac-container">
          <h2>Real-World Breach Examples</h2>
          <div className="examples-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h4>Social Media Platform</h4>
                <p>Attackers exploited IDOR vulnerabilities to access private messages and photos of 5.4 million users by incrementing user IDs in API requests.</p>
                <div className="breach-impact">
                  <span className="impact-badge">5.4M Users</span>
                  <span className="impact-badge">$265M Fine</span>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h4>Healthcare Portal</h4>
                <p>Missing access controls allowed patients to view other patients' medical records by modifying URL parameters in the healthcare portal.</p>
                <div className="breach-impact">
                  <span className="impact-badge">50K Records</span>
                  <span className="impact-badge">HIPAA Violation</span>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h4>E-commerce Platform</h4>
                <p>Privilege escalation vulnerability allowed customers to apply admin discount codes by manipulating hidden form fields during checkout.</p>
                <div className="breach-impact">
                  <span className="impact-badge">$2.3M Loss</span>
                  <span className="impact-badge">3 Months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention & Mitigation */}
      <section className="bac-section bac-prevention">
        <div className="bac-container">
          <h2>Prevention & Mitigation Strategies</h2>
          <div className="prevention-grid">
            <div className="prevention-category">
              <h3>🛡️ Defense in Depth</h3>
              <div className="strategy-list">
                <div className="strategy">
                  <h4>Role-Based Access Control (RBAC)</h4>
                  <p>Implement comprehensive RBAC systems that clearly define user roles and permissions.</p>
                </div>
                <div className="strategy">
                  <h4>Attribute-Based Access Control (ABAC)</h4>
                  <p>Use ABAC for fine-grained access control based on user attributes, environment, and resources.</p>
                </div>
                <div className="strategy">
                  <h4>Server-Side Validation</h4>
                  <p>Always validate permissions on the server-side. Never trust client-side checks alone.</p>
                </div>
              </div>
            </div>
            <div className="prevention-category">
              <h3>🔍 Security Testing</h3>
              <div className="strategy-list">
                <div className="strategy">
                  <h4>Automated Security Scans</h4>
                  <p>Use DAST and SAST tools to automatically detect access control vulnerabilities.</p>
                </div>
                <div className="strategy">
                  <h4>Penetration Testing</h4>
                  <p>Regular manual testing by security experts to identify complex access control issues.</p>
                </div>
                <div className="strategy">
                  <h4>Code Review</h4>
                  <p>Implement mandatory security code reviews for all authorization logic.</p>
                </div>
              </div>
            </div>
            <div className="prevention-category">
              <h3>⚙️ Technical Controls</h3>
              <div className="strategy-list">
                <div className="strategy">
                  <h4>Default Deny Principle</h4>
                  <p>Deny all access by default and only allow explicitly permitted actions.</p>
                </div>
                <div className="strategy">
                  <h4>API Security</h4>
                  <p>Implement proper authentication and authorization for all API endpoints.</p>
                </div>
                <div className="strategy">
                  <h4>Logging & Monitoring</h4>
                  <p>Comprehensive logging of access control decisions and real-time monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="bac-section bac-code">
        <div className="bac-container">
          <h2>Secure Code Examples</h2>
          <div className="code-comparison">
            <div className="code-block vulnerable">
              <h4>❌ Vulnerable Code</h4>
              <pre>{`// UNSAFE: No access control check
app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  res.json(user);
});

// UNSAFE: Client-side control only
function deleteUser(userId) {
  if (currentUser.role === 'admin') {
    // Client-side check can be bypassed
    api.deleteUser(userId);
  }
}`}</pre>
            </div>
            <div className="code-block secure">
              <h4>✅ Secure Code</h4>
              <pre>{`// SAFE: Server-side access control
app.get('/api/users/:id', (req, res) => {
  if (req.user.id !== req.params.id && 
      !req.user.roles.includes('admin')) {
    return res.status(403).json({error: 'Forbidden'});
  }
  const user = getUserById(req.params.id);
  res.json(user);
});

// SAFE: Comprehensive server validation
function deleteUser(userId) {
  if (!hasPermission(req.user, 'delete_user', userId)) {
    throw new Error('Insufficient permissions');
  }
  api.deleteUser(userId);
}`}</pre>
            </div>
          </div>
        </div>
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate("/broken-access-control/sandbox")}
          >
            🚀 Try it Yourself
          </button>
        </div>

      </section>

      {/* Resources */}
      <section className="bac-section bac-resources">
        <div className="bac-container">
          <h2>Additional Resources</h2>
          <div className="resources-grid">
            <a href="https://owasp.org/Top10/A01_2021-Broken_Access_Control/" className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>OWASP Official Documentation</h3>
              <p>Complete technical details and mitigation strategies</p>
            </a>
            <a href="https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html" className="resource-card">
              <div className="resource-icon">🛡️</div>
              <h3>Access Control Cheat Sheet</h3>
              <p>Quick reference for secure implementation</p>
            </a>
            <a href="https://portswigger.net/web-security/access-control" className="resource-card">
              <div className="resource-icon">🔍</div>
              <h3>PortSwigger Academy</h3>
              <p>Interactive labs and learning materials</p>
            </a>
            <a href="https://cwe.mitre.org/data/definitions/639.html" className="resource-card">
              <div className="resource-icon">📋</div>
              <h3>CWE-639: Authorization Bypass</h3>
              <p>Common Weakness Enumeration details</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrokenAccessControl;
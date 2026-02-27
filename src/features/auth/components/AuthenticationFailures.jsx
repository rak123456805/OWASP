import React from "react";
import { Link } from "react-router-dom";
import "../../vulnerable-components/assets/VulnerabilityPage.css";

const AuthenticationFailures = () => {
  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A07:2021</div>
            <h1 className="vp-title">
              Identification and Authentication Failures
            </h1>
            <p className="vp-subtitle">
              Broken authentication mechanisms that allow credential stuffing,
              brute force attacks, session hijacking, and other authentication
              bypass techniques.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#7</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Critical</span>
                <span className="vp-stat-label">Impact</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">90%</span>
                <span className="vp-stat-label">Apps Affected</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">👤</div>
              <div className="vp-icon-text">Authentication</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Authentication Security Gaps</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Authentication failures occur when application functions related
                to authentication and session management are implemented
                incorrectly, allowing attackers to compromise passwords, keys,
                or session tokens, or to exploit other implementation flaws to
                assume other users' identities temporarily or permanently.
              </p>
              <p>
                Confirmation of the user's identity, authentication, and session
                management is critical to protect against authentication-related
                attacks. There may be authentication weaknesses if the
                application permits automated attacks, permits brute force, uses
                weak credentials, has weak password recovery, or uses plain text
                passwords.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Authentication Attack Impacts</h4>
                <ul>
                  <li>Complete account takeover and identity theft</li>
                  <li>
                    Unauthorized access to sensitive data and functionality
                  </li>
                  <li>Financial fraud through compromised user accounts</li>
                  <li>Privilege escalation to administrative functions</li>
                  <li>Reputation damage and loss of customer trust</li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Authentication Request</strong>
                    <span>User attempts to authenticate</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>Weak Controls</strong>
                    <span>Inadequate authentication mechanisms</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>Authentication Bypass</strong>
                    <span>Attacker circumvents authentication</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Account Compromise</strong>
                    <span>Attacker gains unauthorized access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Authentication Vulnerabilities</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔓</div>
              <h3>Credential Stuffing</h3>
              <p>
                Using lists of known username/password pairs from previous
                breaches to gain unauthorized access.
              </p>
              <div className="vp-vector-example">
                <code>Automated login attempts with breached credentials</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">💥</div>
              <h3>Brute Force Attacks</h3>
              <p>
                Systematically trying all possible password combinations to find
                the correct one.
              </p>
              <div className="vp-vector-example">
                <code>Unlimited login attempts without rate limiting</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🍪</div>
              <h3>Session Hijacking</h3>
              <p>
                Stealing or predicting session tokens to impersonate
                authenticated users.
              </p>
              <div className="vp-vector-example">
                <code>Predictable session IDs or tokens exposed in URLs</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🔄</div>
              <h3>Weak Password Recovery</h3>
              <p>
                Insecure password reset mechanisms that can be exploited to take
                over accounts.
              </p>
              <div className="vp-vector-example">
                <code>Security questions with publicly available answers</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🚫</div>
              <h3>Authentication Bypass</h3>
              <p>
                Flaws that allow accessing protected resources without proper
                authentication.
              </p>
              <div className="vp-vector-example">
                <code>URL parameter manipulation to bypass login</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📱</div>
              <h3>Insecure Multi-Factor Auth</h3>
              <p>
                Weak implementations of 2FA/MFA that can be bypassed or have
                implementation flaws.
              </p>
              <div className="vp-vector-example">
                <code>SMS-based 2FA vulnerable to SIM swapping</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Authentication Breaches</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2020</div>
              <div className="vp-timeline-content">
                <h4>Twitter Celebrity Account Hack</h4>
                <p>
                  Social engineering attack combined with authentication bypass
                  allowed attackers to compromise 130 high-profile Twitter
                  accounts including Elon Musk and Barack Obama.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">130 Accounts</span>
                  <span className="vp-impact-badge">Bitcoin Scam</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>Capital One Credential Stuffing</h4>
                <p>
                  Attackers used credential stuffing with previously breached
                  passwords to access 100 million customer accounts through a
                  misconfigured firewall.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">100M Accounts</span>
                  <span className="vp-impact-badge">$190M Fine</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2018</div>
              <div className="vp-timeline-content">
                <h4>Marriott International Breach</h4>
                <p>
                  Weak authentication controls in Starwood's reservation system
                  allowed attackers to access 500 million guest records over
                  four years.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">500M Guests</span>
                  <span className="vp-impact-badge">$123M Fine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>Authentication Security Controls</h2>
          <div className="vp-prevention-grid">
            <div className="vp-prevention-category">
              <h3>🔐 Strong Authentication</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Multi-Factor Authentication</h4>
                  <p>
                    Implement MFA for all users, especially for administrative
                    and sensitive operations.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Strong Password Policies</h4>
                  <p>
                    Enforce minimum password length, complexity, and regular
                    rotation where appropriate.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Secure Password Storage</h4>
                  <p>
                    Use strong adaptive hashing algorithms like bcrypt or Argon2
                    with proper salts.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🛡️ Attack Prevention</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Rate Limiting</h4>
                  <p>
                    Implement strict rate limiting on authentication endpoints
                    to prevent brute force attacks.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Credential Stuffing Protection</h4>
                  <p>
                    Use breached password detection and block known compromised
                    credentials.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Account Lockout</h4>
                  <p>
                    Implement temporary account lockouts after repeated failed
                    authentication attempts.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔒 Session Management</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Secure Session Tokens</h4>
                  <p>
                    Use random, unpredictable session identifiers with proper
                    expiration and invalidation.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Session Timeout</h4>
                  <p>
                    Implement automatic session expiration after periods of
                    inactivity.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Secure Logout</h4>
                  <p>
                    Properly invalidate server-side sessions on logout and
                    client-side token removal.
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
          <h2>Secure Authentication Examples</h2>
          <div className="vp-code-comparison">
            <div className="vp-code-block vp-vulnerable">
              <h4>❌ Vulnerable Authentication</h4>
              <pre>{`// UNSAFE: No rate limiting
app.post('/login', (req, res) => {
  const user = User.findByCredentials(
    req.body.username, 
    req.body.password
  );
  if (user) {
    req.session.userId = user.id; // Predictable ID
  }
});

// UNSAFE: Weak password hashing
const passwordHash = crypto
  .createHash('md5')
  .update(password)
  .digest('hex');

// UNSAFE: No session expiration
app.use(session({
  secret: 'weak-secret',
  cookie: { maxAge: null } // Never expires
}));

// UNSAFE: Plain text passwords
if (inputPassword === storedPassword) {
  // Authentication successful
}`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Secure Authentication</h4>
              <pre>{`// SECURE: Rate limited authentication
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 attempts per window
});
app.use('/login', limiter);

// SECURE: Strong password hashing
const passwordHash = await bcrypt.hash(password, 12);
const isMatch = await bcrypt.compare(password, storedHash);

// SECURE: Secure session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { 
    secure: true,
    httpOnly: true,
    maxAge: 30 * 60 * 1000 // 30 minutes
  },
  resave: false,
  saveUninitialized: false
}));

// SECURE: Multi-factor authentication
if (await verify2FACode(user, req.body.totpCode)) {
  // Grant access
}`}</pre>
            </div>
          </div>

          {/* Standardized Try it Yourself Button */}
          <div className="vp-try-btn-wrapper">
            <Link
              to="/sandbox/authentication-failures"
              className="vp-try-it-btn"
            >
              🚀 Try it Yourself
            </Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="vp-section vp-resources">
        <div className="vp-container">
          <h2>Additional Resources</h2>
          <div className="vp-resources-grid">
            <a
              href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Authentication Guide</h3>
              <p>Complete guide to secure authentication implementation</p>
            </a>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🛡️</div>
              <h3>Authentication Cheat Sheet</h3>
              <p>Comprehensive authentication security practices</p>
            </a>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🔍</div>
              <h3>Session Management Guide</h3>
              <p>Secure session management best practices</p>
            </a>
            <a
              href="https://cwe.mitre.org/data/definitions/287.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-287: Improper Authentication</h3>
              <p>Common Weakness Enumeration for authentication issues</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthenticationFailures;

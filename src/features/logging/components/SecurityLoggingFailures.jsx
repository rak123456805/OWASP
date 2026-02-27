import { useNavigate } from "react-router-dom";
import React from "react";
import "../../vulnerable-components/assets/VulnerabilityPage.css";

const SecurityLoggingFailures = () => {
  const navigate = useNavigate();

  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A09:2021</div>
            <h1 className="vp-title">
              Security Logging and Monitoring Failures
            </h1>
            <p className="vp-subtitle">
              Insufficient logging and monitoring, coupled with missing or
              ineffective integration with incident response, allows attackers
              to further attack systems and maintain persistence.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#9</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Medium</span>
                <span className="vp-stat-label">Impact</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Common</span>
                <span className="vp-stat-label">Prevalence</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">📝</div>
              <div className="vp-icon-text">Logging & Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Logging and Monitoring Gaps</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Insufficient logging and monitoring, coupled with missing or
                ineffective integration with incident response, allows attackers
                to further attack systems, maintain persistence, pivot to more
                systems, and tamper, extract, or destroy data.
              </p>
              <p>
                Most breach studies show time to detect a breach is over 200
                days, typically detected by external parties rather than
                internal processes or monitoring. This category is to help
                detect, escalate, and respond to active breaches.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Logging Failure Impacts</h4>
                <ul>
                  <li>Extended breach duration without detection</li>
                  <li>
                    Inability to investigate security incidents effectively
                  </li>
                  <li>
                    Failure to meet compliance and regulatory requirements
                  </li>
                  <li>
                    Difficulty in identifying attack patterns and threat actors
                  </li>
                  <li>
                    Increased damage and data loss from undetected attacks
                  </li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Security Event</strong>
                    <span>Attack or security incident occurs</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>Insufficient Logging</strong>
                    <span>Critical events not logged or monitored</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>No Detection</strong>
                    <span>Attack goes undetected for extended period</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Extended Compromise</strong>
                    <span>Attackers maintain access and expand control</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Logging and Monitoring Failures</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🚫</div>
              <h3>No Security Event Logging</h3>
              <p>
                Failure to log security-relevant events like logins, access
                control failures, or server-side input validation.
              </p>
              <div className="vp-vector-example">
                <code>No logging of failed authentication attempts</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🔕</div>
              <h3>No Alerting Mechanisms</h3>
              <p>
                Security events are logged but no alerts are generated for
                suspicious activities or thresholds.
              </p>
              <div className="vp-vector-example">
                <code>No alerts for multiple failed logins from same IP</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📊</div>
              <h3>Insufficient Log Details</h3>
              <p>
                Logs that don't capture sufficient context to investigate
                security incidents effectively.
              </p>
              <div className="vp-vector-example">
                <code>Logs without timestamps, user IDs, or source IPs</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🗑️</div>
              <h3>Log Tampering</h3>
              <p>
                Logs that can be altered or deleted by attackers to cover their
                tracks and avoid detection.
              </p>
              <div className="vp-vector-example">
                <code>World-writable log files or directories</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">⏰</div>
              <h3>No Log Retention</h3>
              <p>
                Inadequate log retention policies that prevent historical
                analysis of security incidents.
              </p>
              <div className="vp-vector-example">
                <code>7-day log retention for compliance requiring 1 year</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔍</div>
              <h3>No Real-time Monitoring</h3>
              <p>
                Lack of real-time log analysis and security monitoring to detect
                attacks as they happen.
              </p>
              <div className="vp-vector-example">
                <code>Manual log review instead of automated monitoring</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Logging Failure Breaches</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2020</div>
              <div className="vp-timeline-content">
                <h4>SolarWinds Monitoring Gap</h4>
                <p>
                  Inadequate monitoring allowed attackers to operate undetected
                  for months within SolarWinds' network, distributing malicious
                  updates to thousands of organizations.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">Months Undetected</span>
                  <span className="vp-impact-badge">18K Organizations</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>Capital One Detection Failure</h4>
                <p>
                  Poor logging and monitoring allowed an attacker to exfiltrate
                  100 million customer records over several months without
                  triggering alerts.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">100M Records</span>
                  <span className="vp-impact-badge">Months Undetected</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2018</div>
              <div className="vp-timeline-content">
                <h4>Marriott Starwood Breach</h4>
                <p>
                  Insufficient monitoring allowed attackers to maintain access
                  to Starwood's reservation system for four years, affecting 500
                  million guests.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">4 Years Access</span>
                  <span className="vp-impact-badge">500M Guests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>Comprehensive Logging & Monitoring</h2>
          <div className="vp-prevention-grid">
            <div className="vp-prevention-category">
              <h3>📝 Effective Logging</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Security Event Logging</h4>
                  <p>
                    Log all security-relevant events including authentication,
                    access control, and input validation.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Sufficient Context</h4>
                  <p>
                    Include timestamps, source IPs, user IDs, and event details
                    in all security logs.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Structured Logging</h4>
                  <p>
                    Use structured logging formats (JSON) for easier parsing and
                    analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔔 Proactive Monitoring</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Real-time Alerting</h4>
                  <p>
                    Implement real-time alerts for suspicious activities and
                    security thresholds.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>SIEM Integration</h4>
                  <p>
                    Use Security Information and Event Management systems for
                    centralized monitoring.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Anomaly Detection</h4>
                  <p>
                    Implement behavioral analytics to detect unusual patterns
                    and potential threats.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🛡️ Log Protection</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Secure Log Storage</h4>
                  <p>
                    Protect logs from tampering through proper access controls
                    and integrity checks.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Adequate Retention</h4>
                  <p>
                    Maintain logs for sufficient duration to meet compliance and
                    investigation needs.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Incident Response</h4>
                  <p>
                    Integrate logging with incident response processes for rapid
                    detection and response.
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
          <h2>Secure Logging Examples</h2>
          <div className="vp-code-comparison">
            <div className="vp-code-block vp-vulnerable">
              <h4>❌ Inadequate Logging</h4>
              <pre>{`// UNSAFE: No security logging
app.post('/login', (req, res) => {
  const user = authenticate(req.body);
  if (user) {
    // No logging of successful login
    res.json({ success: true });
  }
});

// UNSAFE: Insufficient log details
console.log('User logged in'); // No context

// UNSAFE: Logs with sensitive data
logger.info(\`User \${username} password: \${password}\`);

// UNSAFE: No error logging
try {
  processPayment(request);
} catch (error) {
  // No logging of payment failures
}`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Comprehensive Logging</h4>
              <pre>{`// SECURE: Detailed security logging
app.post('/login', (req, res) => {
  const user = authenticate(req.body);
  if (user) {
    securityLogger.info({
      event: 'login_success',
      userId: user.id,
      timestamp: new Date().toISOString(),
      sourceIp: req.ip,
      userAgent: req.get('User-Agent')
    });
    res.json({ success: true });
  } else {
    securityLogger.warn({
      event: 'login_failed',
      username: req.body.username,
      timestamp: new Date().toISOString(),
      sourceIp: req.ip
    });
  }
});

// SECURE: Structured logging without sensitive data
logger.info({
  event: 'user_authentication',
  userId: user.id,
  action: 'login',
  timestamp: new Date().toISOString()
});

// SECURE: Comprehensive error logging
try {
  processPayment(request);
} catch (error) {
  logger.error({
    event: 'payment_processing_failed',
    error: error.message,
    userId: user.id,
    amount: request.amount,
    timestamp: new Date().toISOString()
  });
}`}</pre>
            </div>
          </div>
        </div>
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate("/security-logging-failures/sandbox")}
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
              href="https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Logging Guide</h3>
              <p>Complete guide to security logging and monitoring</p>
            </a>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🛡️</div>
              <h3>Logging Cheat Sheet</h3>
              <p>Comprehensive logging security practices</p>
            </a>
            <a
              href="https://www.elastic.co/guide/en/ecs/current/index.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🔍</div>
              <h3>Elastic Common Schema</h3>
              <p>Standardized logging schema for security monitoring</p>
            </a>
            <a
              href="https://cwe.mitre.org/data/definitions/778.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-778: Insufficient Logging</h3>
              <p>Common Weakness Enumeration for logging issues</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityLoggingFailures;

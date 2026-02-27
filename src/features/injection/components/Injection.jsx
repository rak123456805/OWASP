import React from 'react';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import { useNavigate } from 'react-router-dom';

const Injection = () => {
  const navigate = useNavigate();

  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A03:2021</div>
            <h1 className="vp-title">Injection</h1>
            <p className="vp-subtitle">
              Untrusted data is sent to an interpreter as part of a command or query, leading to data loss, corruption, disclosure to unauthorized parties, or complete host takeover.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#3</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Severe</span>
                <span className="vp-stat-label">Impact</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">94%</span>
                <span className="vp-stat-label">Apps Affected</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">💉</div>
              <div className="vp-icon-text">Code Injection</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Injection Attacks Overview</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query.
                Attackers can trick the interpreter into executing unintended commands or accessing data without authorization.
                Injection vulnerabilities are particularly dangerous as they can lead to complete system compromise.
              </p>
              <p>
                The most common injection is SQL injection, but interpreters for LDAP, XPath, NoSQL queries, OS commands,
                XML parsers, SMTP headers, expression languages, and ORM queries are all susceptible to injection attacks.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Attack Consequences</h4>
                <ul>
                  <li>Database takeover and data theft</li>
                  <li>Authentication bypass and privilege escalation</li>
                  <li>Remote code execution on servers</li>
                  <li>Complete system compromise</li>
                  <li>Data corruption and deletion</li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>User Input</strong>
                    <span>Attacker provides malicious input</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>No Validation</strong>
                    <span>Application trusts user input</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>Injection</strong>
                    <span>Malicious code reaches interpreter</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Exploitation</strong>
                    <span>Interpreter executes attacker's code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Injection Types</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🗃️</div>
              <h3>SQL Injection</h3>
              <p>Most common injection type where attackers manipulate SQL queries to access, modify, or delete database data.</p>
              <div className="vp-vector-example">
                <code>username: admin' OR '1'='1'--</code>
              </div>
              <div className="vp-vector-example">
                <code>password: x' UNION SELECT credit_card FROM users--</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">💻</div>
              <h3>Command Injection</h3>
              <p>Attackers execute arbitrary commands on the host operating system through vulnerable applications.</p>
              <div className="vp-vector-example">
                <code>input.txt; rm -rf /</code>
              </div>
              <div className="vp-vector-example">
                <code>127.0.0.1 && cat /etc/passwd</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">📄</div>
              <h3>XPath Injection</h3>
              <p>Similar to SQL injection but targets XML documents and XPath queries used in web services.</p>
              <div className="vp-vector-example">
                <code>' or '1'='1</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📧</div>
              <h3>LDAP Injection</h3>
              <p>Manipulates LDAP queries to bypass authentication or access unauthorized directory information.</p>
              <div className="vp-vector-example">
                <code>*)(&</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🔄</div>
              <h3>NoSQL Injection</h3>
              <p>Exploits NoSQL databases by injecting operations into queries, often through JSON inputs.</p>
              <div className="vp-vector-example">
                <code>{"{$ne: null}"}</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🌐</div>
              <h3>ORM Injection</h3>
              <p>Injection through Object-Relational Mapping layers when raw queries or unsafe methods are used.</p>
              <div className="vp-vector-example">
                <code>{`User.where("name = '#{params[:name]}'")`}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Injection Breaches</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>British Airways Data Breach</h4>
                <p>Attackers used SQL injection to steal payment card data from 380,000 booking transactions, resulting in a £20 million GDPR fine.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">380K Cards</span>
                  <span className="vp-impact-badge">£20M Fine</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2017</div>
              <div className="vp-timeline-content">
                <h4>Yahoo Data Breaches</h4>
                <p>Multiple SQL injection vulnerabilities led to the compromise of all 3 billion user accounts in what remains the largest data breach in history.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">3B Accounts</span>
                  <span className="vp-impact-badge">$350M Loss</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2015</div>
              <div className="vp-timeline-content">
                <h4>TalkTalk Telecom Breach</h4>
                <p>SQL injection in a legacy web portal allowed attackers to access personal data of 157,000 customers, costing the company £60 million.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">157K Customers</span>
                  <span className="vp-impact-badge">£60M Cost</span>
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
              <h3>🛡️ Input Validation</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Parameterized Queries</h4>
                  <p>Use prepared statements with parameterized queries to separate SQL code from data.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Input Whitelisting</h4>
                  <p>Validate and sanitize all user inputs using allow-lists rather than block-lists.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Stored Procedures</h4>
                  <p>Use stored procedures with parameters instead of dynamic SQL queries.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔒 Security Controls</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Least Privilege</h4>
                  <p>Database accounts should have minimal required privileges, not full admin access.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Web Application Firewalls</h4>
                  <p>Implement WAFs to detect and block injection attempts in real-time.</p>
                </div>
                <div className="vp-strategy">
                  <h4>ORM Security</h4>
                  <p>Use ORM frameworks safely and avoid raw query methods with user input.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔍 Detection & Testing</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Static Analysis</h4>
                  <p>Use SAST tools to identify injection vulnerabilities in source code.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Dynamic Testing</h4>
                  <p>Conduct regular penetration testing and DAST scanning for injection flaws.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Security Headers</h4>
                  <p>Implement Content Security Policy and other security headers.</p>
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
              <pre>{`// UNSAFE: Dynamic SQL construction
const query = \`SELECT * FROM users WHERE username = '\${username}'\`;
db.query(query);

// UNSAFE: Direct command execution
exec(\`ping \${userInput}\`);

// UNSAFE: No input validation
app.post('/search', (req, res) => {
  const results = db.users.find({
    $where: \`this.name === '\${req.body.query}'\`
  });
});`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Secure Code</h4>
              <pre>{`// SAFE: Parameterized queries
const query = 'SELECT * FROM users WHERE username = ?';
db.query(query, [username]);

// SAFE: Input validation and escaping
const safeInput = validator.escape(userInput);
execFile('ping', [safeInput]);

// SAFE: ORM with built-in protection
const results = await User.find({
  where: { name: req.body.query }
});

// SAFE: Stored procedures
db.execute('sp_getUserByUsername', [username]);`}</pre>
            </div>
          </div>
        </div>

        {/* Standardized Try it Yourself Button */}
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate('/injection-sandbox')}
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
            <a href="https://owasp.org/Top10/A03_2021-Injection/" className="vp-resource-card">
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Injection Prevention</h3>
              <p>Complete guide to preventing all types of injection attacks</p>
            </a>
            <a href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" className="vp-resource-card">
              <div className="vp-resource-icon">🛡️</div>
              <h3>SQL Injection Prevention</h3>
              <p>Comprehensive cheat sheet for SQL injection protection</p>
            </a>
            <a href="https://portswigger.net/web-security/sql-injection" className="vp-resource-card">
              <div className="vp-resource-icon">🔍</div>
              <h3>SQL Injection Labs</h3>
              <p>Interactive labs to practice SQL injection detection and prevention</p>
            </a>
            <a href="https://cwe.mitre.org/data/definitions/89.html" className="vp-resource-card">
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-89: SQL Injection</h3>
              <p>Common Weakness Enumeration for SQL injection vulnerabilities</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Injection;

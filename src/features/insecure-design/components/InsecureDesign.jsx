import React from 'react';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import { useNavigate } from 'react-router-dom';

const InsecureDesign = () => {
  const navigate = useNavigate();

  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A04:2021</div>
            <h1 className="vp-title">Insecure Design</h1>
            <p className="vp-subtitle">
              Missing or ineffective control design that fails to prevent security flaws before implementation.
              This represents different weaknesses from insecure implementation.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#4</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">High</span>
                <span className="vp-stat-label">Impact</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">New</span>
                <span className="vp-stat-label">Category</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">📐</div>
              <div className="vp-icon-text">Design Flaws</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Understanding Insecure Design</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Insecure design refers to security weaknesses that are "built-in" to the application architecture
                and design, making them difficult to fix later through patches or configuration changes. Unlike
                implementation bugs, these flaws exist because security was not considered during the design phase.
              </p>
              <p>
                This category focuses on risks related to design and architectural flaws, with a call for more use
                of threat modeling, secure design patterns, and reference architectures. Insecure design cannot be
                fixed by perfect implementation.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Design Flaw Impacts</h4>
                <ul>
                  <li>Fundamental security control gaps that cannot be patched</li>
                  <li>Expensive and time-consuming system redesigns</li>
                  <li>Inherent vulnerability to entire classes of attacks</li>
                  <li>Difficulty in achieving compliance and security certifications</li>
                  <li>Long-term technical debt and maintenance challenges</li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Requirements Phase</strong>
                    <span>Security requirements not defined</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>Design Phase</strong>
                    <span>No threat modeling or security architecture</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>Insecure Design</strong>
                    <span>Fundamental security flaws built into architecture</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Implementation</strong>
                    <span>Perfect implementation still vulnerable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Insecure Design Patterns</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🏗️</div>
              <h3>Missing Security Architecture</h3>
              <p>No defined security architecture, threat models, or security requirements during design phase.</p>
              <div className="vp-vector-example">
                <code>No authentication design for sensitive operations</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🔍</div>
              <h3>Inadequate Threat Modeling</h3>
              <p>Failure to identify threats, attackers, and attack vectors during design phase.</p>
              <div className="vp-vector-example">
                <code>No consideration for insider threats or supply chain attacks</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🔄</div>
              <h3>Poor Data Flow Design</h3>
              <p>Insecure data flows that expose sensitive information or create single points of failure.</p>
              <div className="vp-vector-example">
                <code>Client-side processing of sensitive business logic</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🎯</div>
              <h3>Weak Trust Boundaries</h3>
              <p>Poorly defined trust boundaries between components, services, or user roles.</p>
              <div className="vp-vector-example">
                <code>Microservices without proper service-to-service authentication</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">📊</div>
              <h3>Inadequate Error Handling</h3>
              <p>Design that doesn't account for failure scenarios or provides too much information in errors.</p>
              <div className="vp-vector-example">
                <code>Detailed error messages revealing system internals</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔐</div>
              <h3>Missing Security Controls</h3>
              <p>Fundamental security controls like encryption, logging, or monitoring not designed into the system.</p>
              <div className="vp-vector-example">
                <code>No audit trail design for financial transactions</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Design Failure Examples</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2021</div>
              <div className="vp-timeline-content">
                <h4>SolarWinds Supply Chain Attack</h4>
                <p>Insecure software development lifecycle design allowed attackers to inject malicious code into software updates, affecting 18,000 organizations including government agencies.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">18K Organizations</span>
                  <span className="vp-impact-badge">Nation State</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2018</div>
              <div className="vp-timeline-content">
                <h4>Facebook-Cambridge Analytica</h4>
                <p>Fundamental design flaw in Facebook's API allowed third-party apps to access friend data without consent, affecting 87 million users.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">87M Users</span>
                  <span className="vp-impact-badge">$5B Fine</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2017</div>
              <div className="vp-timeline-content">
                <h4>Equifax API Design Flaw</h4>
                <p>Poor API design with inadequate authentication allowed attackers to query the system without proper authorization, leading to massive data exposure.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">147M Records</span>
                  <span className="vp-impact-badge">$700M Settlement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>Secure Design Principles & Strategies</h2>
          <div className="vp-prevention-grid">
            <div className="vp-prevention-category">
              <h3>🏗️ Secure Development Lifecycle</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Threat Modeling</h4>
                  <p>Systematically identify potential threats during design using methodologies like STRIDE or DREAD.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Security Requirements</h4>
                  <p>Define explicit security requirements and acceptance criteria before implementation begins.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Secure Design Patterns</h4>
                  <p>Use established security patterns and reference architectures for common security problems.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔐 Security Architecture</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Defense in Depth</h4>
                  <p>Implement multiple layers of security controls rather than relying on single solutions.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Principle of Least Privilege</h4>
                  <p>Design systems where components and users have minimal necessary permissions.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Secure Defaults</h4>
                  <p>Design secure configurations as defaults rather than requiring security to be enabled.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔍 Security Validation</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Design Reviews</h4>
                  <p>Conduct formal security architecture reviews with security experts before implementation.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Security Testing</h4>
                  <p>Include security testing in definition of done and acceptance criteria.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Risk Assessment</h4>
                  <p>Perform continuous risk assessment throughout the development lifecycle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code */}
      <section className="vp-section vp-code">
        <div className="vp-container">
          <h2>Secure Design Examples</h2>
          <div className="vp-code-comparison">
            <div className="vp-code-block vp-vulnerable">
              <h4>❌ Insecure Design</h4>
              <pre>{`// DESIGN FLAW: No authentication in design
class PaymentProcessor {
  processPayment(amount, cardDetails) {
    // No authentication checks in design
    return bank.transfer(amount, cardDetails);
  }
}

// DESIGN FLAW: Client-side trust
class UserSession {
  isAdmin() {
    return this.userRole === 'admin'; // Client-side role check
  }
}

// DESIGN FLAW: No encryption requirement
class DataStorage {
  storeUserData(userData) {
    // No encryption requirement in design
    database.save(userData);
  }
}`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Secure Design</h4>
              <pre>{`// SECURE DESIGN: Authentication built-in
@Authenticated
@Authorized(roles=['PAYMENT_PROCESSOR'])
class PaymentProcessor {
  processPayment(@Encrypted PaymentRequest request) {
    audit.logPaymentAttempt(request);
    return bank.transfer(request);
  }
}

// SECURE DESIGN: Server-side authorization
class AuthorizationService {
  isUserAuthorized(userId, action, resource) {
    return this.permissions.check(userId, action, resource);
  }
}

// SECURE DESIGN: Encryption by design
class SecureDataStorage {
  @Encrypted
  storeUserData(@Sensitive UserData data) {
    const encrypted = encryption.encrypt(data);
    return database.save(encrypted);
  }
}`}</pre>
            </div>
          </div>
        </div>

        {/* Standardized Try it Yourself Button */}
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate('/insecure-design/sandbox')}
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
            <a href="https://owasp.org/Top10/A04_2021-Insecure_Design/" className="vp-resource-card">
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Secure Design Principles</h3>
              <p>Complete guide to secure application design and architecture</p>
            </a>
            <a href="https://owasp.org/www-community/Threat_Modeling" className="vp-resource-card">
              <div className="vp-resource-icon">🛡️</div>
              <h3>Threat Modeling Guide</h3>
              <p>Comprehensive guide to threat modeling methodologies and practices</p>
            </a>
            <a href="https://martinfowler.com/bliki/StrategicDesign.html" className="vp-resource-card">
              <div className="vp-resource-icon">🔍</div>
              <h3>Strategic Design Patterns</h3>
              <p>Domain-driven design patterns for secure architecture</p>
            </a>
            <a href="https://cwe.mitre.org/data/definitions/1008.html" className="vp-resource-card">
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-1008: Architectural Issues</h3>
              <p>Common Weakness Enumeration for architectural security problems</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsecureDesign;

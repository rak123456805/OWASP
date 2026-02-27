import { useNavigate } from "react-router-dom";
import React from "react";
import "../../vulnerable-components/assets/VulnerabilityPage.css";

const ServerSideRequestForgery = () => {
  const navigate = useNavigate();

  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A10:2021</div>
            <h1 className="vp-title">Server-Side Request Forgery</h1>
            <p className="vp-subtitle">
              Web applications that fetch remote resources without validating
              user-supplied URLs, allowing attackers to make the application
              send crafted requests to unexpected destinations.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#10</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">High</span>
                <span className="vp-stat-label">Impact</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Less Common</span>
                <span className="vp-stat-label">Prevalence</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">🔄</div>
              <div className="vp-icon-text">SSRF Attacks</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>SSRF Attack Vectors</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                SSRF flaws occur when a web application fetches a remote
                resource without validating the user-supplied URL. Attackers can
                force the application to send crafted requests to unexpected
                destinations, even when protected by firewalls, VPNs, or network
                access control lists.
              </p>
              <p>
                Modern web applications provide convenient features for end
                users, which can fetch and display data from remote URLs. As a
                result, the attacker can coerce the application to send a
                crafted request to an unexpected destination, even when
                protected by firewalls, VPNs, or another type of network access
                control list.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 SSRF Attack Impacts</h4>
                <ul>
                  <li>
                    Access to internal systems and cloud metadata services
                  </li>
                  <li>Port scanning of internal network infrastructure</li>
                  <li>
                    Remote code execution through internal service exploitation
                  </li>
                  <li>Data exfiltration from internal systems</li>
                  <li>Bypass of network security controls and firewalls</li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>User Input</strong>
                    <span>Attacker provides malicious URL</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>No URL Validation</strong>
                    <span>Application trusts user-provided URLs</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>SSRF Request</strong>
                    <span>Application makes request to internal resource</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Internal Access</strong>
                    <span>Attacker gains access to internal systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common SSRF Attack Types</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🏠</div>
              <h3>Internal Network Access</h3>
              <p>
                Accessing internal services and systems that are not exposed to
                the public internet.
              </p>
              <div className="vp-vector-example">
                <code>http://192.168.1.1/admin</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">☁️</div>
              <h3>Cloud Metadata Access</h3>
              <p>
                Accessing cloud provider metadata services to obtain credentials
                and sensitive information.
              </p>
              <div className="vp-vector-example">
                <code>http://169.254.169.254/latest/meta-data/</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🔍</div>
              <h3>Port Scanning</h3>
              <p>
                Scanning internal network ports to discover services and
                identify potential attack targets.
              </p>
              <div className="vp-vector-example">
                <code>http://internal-service:22</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🔄</div>
              <h3>Protocol Smuggling</h3>
              <p>
                Using different URL schemes and protocols to bypass filters and
                access restricted resources.
              </p>
              <div className="vp-vector-example">
                <code>file:///etc/passwd</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">💻</div>
              <h3>Remote Code Execution</h3>
              <p>
                Chaining SSRF with other vulnerabilities to achieve remote code
                execution on internal systems.
              </p>
              <div className="vp-vector-example">
                <code>http://localhost:8080/actuator/gateway/routes</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📧</div>
              <h3>Service Interaction</h3>
              <p>
                Interacting with internal services like databases, caches, or
                message queues through SSRF.
              </p>
              <div className="vp-vector-example">
                <code>http://redis:6379/</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World SSRF Breaches</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>Capital One SSRF Breach</h4>
                <p>
                  SSRF vulnerability allowed attacker to access AWS metadata
                  service and obtain temporary credentials, leading to exposure
                  of 100 million customer records.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">100M Records</span>
                  <span className="vp-impact-badge">AWS Compromise</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2021</div>
              <div className="vp-timeline-content">
                <h4>Microsoft Exchange SSRF</h4>
                <p>
                  SSRF vulnerability in Microsoft Exchange Server
                  (CVE-2021-26855) allowed attackers to bypass authentication
                  and achieve remote code execution.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">30K Organizations</span>
                  <span className="vp-impact-badge">RCE</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2020</div>
              <div className="vp-timeline-content">
                <h4>Shopify SSRF Incident</h4>
                <p>
                  SSRF vulnerability in Shopify's partner and collaborator
                  system allowed access to internal services and sensitive
                  merchant data.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">Internal Access</span>
                  <span className="vp-impact-badge">Merchant Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>SSRF Prevention Strategies</h2>
          <div className="vp-prevention-grid">
            <div className="vp-prevention-category">
              <h3>🛡️ Input Validation</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>URL Allow Lists</h4>
                  <p>
                    Maintain allow lists of permitted domains and block all
                    other URLs.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Scheme Restrictions</h4>
                  <p>
                    Only allow HTTP and HTTPS protocols, block file, gopher,
                    ftp, and other schemes.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>IP Address Validation</h4>
                  <p>
                    Block requests to internal IP addresses, localhost, and
                    cloud metadata services.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔒 Network Controls</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Egress Filtering</h4>
                  <p>
                    Implement network egress filtering to restrict outbound
                    connections from application servers.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Segmentation</h4>
                  <p>
                    Use network segmentation to isolate application servers from
                    sensitive internal systems.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>DNS Rebinding Protection</h4>
                  <p>
                    Implement DNS resolution controls to prevent DNS rebinding
                    attacks.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔍 Response Handling</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Response Validation</h4>
                  <p>
                    Validate and sanitize responses from remote resources before
                    processing them.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Content-Type Restrictions</h4>
                  <p>
                    Only process expected content types and reject unexpected
                    response formats.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Timeout Configuration</h4>
                  <p>
                    Set reasonable timeouts for remote requests to prevent
                    denial of service.
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
          <h2>SSRF Prevention Examples</h2>
          <div className="vp-code-comparison">
            <div className="vp-code-block vp-vulnerable">
              <h4>❌ Vulnerable SSRF</h4>
              <pre>{`// UNSAFE: No URL validation
app.get('/fetch', async (req, res) => {
  const url = req.query.url;
  const response = await fetch(url); // Direct use of user input
  const data = await response.text();
  res.send(data);
});

// UNSAFE: Internal network access
app.post('/webhook', (req, res) => {
  const target = req.body.target;
  http.get(target, (response) => {
    // Can access internal services
  });
});

// UNSAFE: File protocol access
function downloadFile(url) {
  // file:///etc/passwd can be accessed
  return fs.createReadStream(new URL(url));
}`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ SSRF Protected</h4>
              <pre>{`// SECURE: URL validation with allow list
const allowedDomains = ['example.com', 'cdn.example.com'];
const allowedSchemes = ['https:', 'http:'];

function validateUrl(inputUrl) {
  const url = new URL(inputUrl);
  
  // Scheme validation
  if (!allowedSchemes.includes(url.protocol)) {
    throw new Error('Invalid URL scheme');
  }
  
  // Domain validation
  if (!allowedDomains.includes(url.hostname)) {
    throw new Error('Domain not allowed');
  }
  
  // Internal IP blocking
  if (isInternalIp(url.hostname)) {
    throw new Error('Internal IP addresses not allowed');
  }
  
  return url.toString();
}

app.get('/fetch', async (req, res) => {
  try {
    const safeUrl = validateUrl(req.query.url);
    const response = await fetch(safeUrl, {
      timeout: 5000,
      redirect: 'error'
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// SECURE: Network-level protection
app.use('/webhook', (req, res, next) => {
  req.setTimeout(5000); // 5 second timeout
  next();
});`}</pre>
            </div>
          </div>
        </div>
        <div className="vp-try-btn-wrapper">
          <button
            type="button"
            className="vp-try-it-btn"
            onClick={() => navigate("/server-side-request-forgery/sandbox")}
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
              href="https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP SSRF Prevention</h3>
              <p>Complete guide to preventing server-side request forgery</p>
            </a>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🛡️</div>
              <h3>SSRF Prevention Cheat Sheet</h3>
              <p>Comprehensive SSRF prevention practices</p>
            </a>
            <a
              href="https://portswigger.net/web-security/ssrf"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🔍</div>
              <h3>SSRF Labs & Testing</h3>
              <p>Interactive SSRF labs and testing methodologies</p>
            </a>
            <a
              href="https://cwe.mitre.org/data/definitions/918.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-918: SSRF</h3>
              <p>Common Weakness Enumeration for server-side request forgery</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServerSideRequestForgery;

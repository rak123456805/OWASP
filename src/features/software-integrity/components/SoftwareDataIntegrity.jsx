import { useNavigate } from "react-router-dom";
import React from "react";
import "../../vulnerable-components/assets/VulnerabilityPage.css";

const SoftwareDataIntegrity = () => {
  const navigate = useNavigate();

  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A08:2021</div>
            <h1 className="vp-title">Software and Data Integrity Failures</h1>
            <p className="vp-subtitle">
              Failures related to code and infrastructure that does not protect
              against integrity violations, including insecure CI/CD pipelines,
              unauthorized software updates, and data serialization issues.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#8</span>
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
              <div className="vp-icon">📊</div>
              <div className="vp-icon-text">Integrity Protection</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Integrity Verification Failures</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Software and data integrity failures relate to code and
                infrastructure that does not protect against integrity
                violations. This can occur when software and data are not
                verified for integrity, leading to potential supply chain
                compromises, unauthorized software updates, or malicious code
                execution.
              </p>
              <p>
                This category focuses on assumptions related to software
                updates, critical data, and CI/CD pipelines without verifying
                integrity. One of the highest weighted impacts from Common
                Vulnerability and Exposures/Common Vulnerability Scoring System
                (CVE/CVSS) data mapped to the 10 CWEs in this category.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Integrity Failure Impacts</h4>
                <ul>
                  <li>
                    Supply chain attacks compromising entire software ecosystems
                  </li>
                  <li>Unauthorized code execution through malicious updates</li>
                  <li>
                    Data corruption or manipulation affecting business
                    operations
                  </li>
                  <li>
                    Remote code execution through deserialization
                    vulnerabilities
                  </li>
                  <li>
                    Complete system compromise through compromised dependencies
                  </li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Software Supply Chain</strong>
                    <span>Code moves through development pipeline</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>No Integrity Checks</strong>
                    <span>Missing verification of code and data integrity</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>Integrity Compromise</strong>
                    <span>Malicious code or data enters the system</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>System Compromise</strong>
                    <span>
                      Compromised code executes with system privileges
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Integrity Failure Types</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">⚡</div>
              <h3>Insecure CI/CD Pipelines</h3>
              <p>
                Build pipelines without proper access controls, allowing
                unauthorized code changes or malicious deployments.
              </p>
              <div className="vp-vector-example">
                <code>
                  Publicly accessible Jenkins servers with weak authentication
                </code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📦</div>
              <h3>Unverified Software Updates</h3>
              <p>
                Applications that download and install updates without verifying
                their authenticity or integrity.
              </p>
              <div className="vp-vector-example">
                <code>HTTP-based updates without digital signatures</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">🔗</div>
              <h3>Insecure Deserialization</h3>
              <p>
                Deserializing untrusted data without proper validation, leading
                to remote code execution.
              </p>
              <div className="vp-vector-example">
                <code>Java ObjectInputStream with user-controlled data</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🌐</div>
              <h3>Plugin Architecture Risks</h3>
              <p>
                Systems that load plugins or modules without verifying their
                integrity or authenticity.
              </p>
              <div className="vp-vector-example">
                <code>WordPress plugins from untrusted sources</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔄</div>
              <h3>Supply Chain Compromises</h3>
              <p>
                Dependencies or third-party components that have been
                maliciously modified before distribution.
              </p>
              <div className="vp-vector-example">
                <code>SolarWinds Orion software compromise</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📝</div>
              <h3>Data Integrity Issues</h3>
              <p>
                Applications that don't verify the integrity of critical data,
                allowing tampering or corruption.
              </p>
              <div className="vp-vector-example">
                <code>
                  Financial data without checksums or digital signatures
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Integrity Breaches</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2020</div>
              <div className="vp-timeline-content">
                <h4>SolarWinds Supply Chain Attack</h4>
                <p>
                  Attackers compromised SolarWinds' build system to distribute
                  malicious updates to 18,000 organizations, including US
                  government agencies and Fortune 500 companies.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">18K Organizations</span>
                  <span className="vp-impact-badge">Nation State</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>Capital One Build System Compromise</h4>
                <p>
                  Misconfigured web application firewall in CI/CD pipeline
                  allowed attacker to execute commands and access 100 million
                  customer records.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">100M Records</span>
                  <span className="vp-impact-badge">$190M Fine</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2017</div>
              <div className="vp-timeline-content">
                <h4>NotPetya Malware Attack</h4>
                <p>
                  Compromised software update for Ukrainian accounting software
                  MeDoc spread globally, causing $10 billion in damages to
                  companies worldwide.
                </p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">$10B Damage</span>
                  <span className="vp-impact-badge">Global Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>Integrity Protection Strategies</h2>
          <div className="vp-prevention-grid">
            <div className="vp-prevention-category">
              <h3>🔐 Code Integrity</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Digital Signatures</h4>
                  <p>
                    Use code signing and verify digital signatures for all
                    software updates and deployments.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Secure CI/CD</h4>
                  <p>
                    Implement strict access controls, audit trails, and
                    integrity checks in build pipelines.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Software Bill of Materials</h4>
                  <p>
                    Maintain SBOM to track all components and verify their
                    integrity.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🛡️ Supply Chain Security</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Dependency Verification</h4>
                  <p>
                    Verify checksums and digital signatures for all third-party
                    dependencies.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Vetted Sources</h4>
                  <p>
                    Only use dependencies from trusted sources with good
                    security practices.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Isolated Build Environments</h4>
                  <p>
                    Use isolated, secure build environments to prevent
                    contamination.
                  </p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔍 Data Integrity</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Secure Deserialization</h4>
                  <p>
                    Use safe deserialization libraries and validate all
                    serialized data.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Data Verification</h4>
                  <p>
                    Implement checksums, hashes, or digital signatures for
                    critical data.
                  </p>
                </div>
                <div className="vp-strategy">
                  <h4>Immutable Infrastructure</h4>
                  <p>
                    Use immutable infrastructure patterns to prevent runtime
                    modifications.
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
          <h2>Secure Integrity Examples</h2>
          <div className="vp-code-comparison">
            <div className="vp-code-block vp-vulnerable">
              <h4>❌ Vulnerable Integrity</h4>
              <pre>{`// UNSAFE: Insecure deserialization
public User deserializeUser(byte[] data) {
  ObjectInputStream ois = new ObjectInputStream(
    new ByteArrayInputStream(data)
  );
  return (User) ois.readObject(); // RCE vulnerability
}

// UNSAFE: No update verification
public void downloadUpdate(String url) {
  byte[] update = http.get(url).bytes(); // No signature check
  installUpdate(update);
}

// UNSAFE: Weak CI/CD security
pipeline {
  agent any  // No access controls
  stages {
    stage('Build') {
      steps {
        sh 'make'  // No integrity checks
      }
    }
  }
}`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Secure Integrity</h4>
              <pre>{`// SECURE: Safe deserialization
public User deserializeUser(byte[] data) {
  JsonParser parser = JsonParserFactory.getJsonParser();
  return parser.parse(data, User.class); // Safe parser
}

// SECURE: Verified updates
public void downloadUpdate(String url, String expectedHash) {
  byte[] update = http.get(url).bytes();
  String actualHash = sha256(update);
  if (!actualHash.equals(expectedHash)) {
    throw new SecurityException("Update integrity check failed");
  }
  installUpdate(update);
}

// SECURE: Secure CI/CD pipeline
pipeline {
  agent {
    docker {
      image 'secure-build-image'
      label 'secured-node'
    }
  }
  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }
  stages {
    stage('Security Scan') {
      steps {
        sh 'dependency-check --project myapp'
        sh 'gosec ./...'
      }
    }
  }
}`}</pre>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={() => navigate("/software-data-integrity/sandbox")}
        >
          Try it Yourself
        </button>
      </section>

      {/* Resources */}
      <section className="vp-section vp-resources">
        <div className="vp-container">
          <h2>Additional Resources</h2>
          <div className="vp-resources-grid">
            <a
              href="https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Integrity Guide</h3>
              <p>Complete guide to software and data integrity protection</p>
            </a>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">🛡️</div>
              <h3>Deserialization Security</h3>
              <p>Secure deserialization practices and prevention</p>
            </a>
            <a href="https://slsa.dev/" className="vp-resource-card">
              <div className="vp-resource-icon">🔍</div>
              <h3>SLSA Framework</h3>
              <p>
                Supply chain Levels for Software Artifacts security framework
              </p>
            </a>
            <a
              href="https://cwe.mitre.org/data/definitions/502.html"
              className="vp-resource-card"
            >
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-502: Deserialization</h3>
              <p>Common Weakness Enumeration for deserialization issues</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareDataIntegrity;

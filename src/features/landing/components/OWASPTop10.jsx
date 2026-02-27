import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../assets/OWASP.module.css';

const OWASPTop10 = () => {
  // 'marquee' = default scrolling | 'expanded' = 3-col detailed | 'grid' = 5×2 rows
  const [view, setView] = useState('marquee');
  const [isPaused, setIsPaused] = useState(false);

  const handleToggle = () => {
    if (view === 'marquee') setView('expanded');
    else if (view === 'expanded') setView('grid');
    else setView('expanded');
  };

  const vulnerabilities = [
    { id: 1, name: "Broken Access Control", desc: "Restrictions on authenticated users are not properly enforced.", link: "/broken-access-control", image: "/brokenaccesscontrol.png", color: "#ef4444", details: "Attackers bypass authorization to access admin functions, view sensitive records, or modify data. Includes IDOR, missing access controls, and CORS misconfigurations.", tags: ["IDOR", "CORS", "Authorization"] },
    { id: 2, name: "Cryptographic Failures", desc: "Failures related to cryptography leading to exposure of sensitive data.", link: "/cryptographic-failures", image: "/cryptography.png", color: "#f59e0b", details: "Transmitting data in cleartext, using weak algorithms, improper key management, and missing transport-layer security contribute to this category.", tags: ["Encryption", "TLS", "Key Mgmt"] },
    { id: 3, name: "Injection", desc: "Untrusted data sent to an interpreter as part of a command or query.", link: "/injection", image: "/injuction.png", color: "#10b981", details: "SQL, NoSQL, OS, and LDAP injection occur when untrusted data is sent to an interpreter. Attackers trick it into executing unintended commands.", tags: ["SQL", "NoSQL", "LDAP", "XSS"] },
    { id: 4, name: "Insecure Design", desc: "Missing or ineffective control design that fails to prevent security flaws.", link: "/insecure-design", image: "/insecuredesign.png", color: "#8b5cf6", details: "Risks related to design flaws. An insecure design cannot be fixed by a perfect implementation. Requires threat modeling and secure design patterns.", tags: ["Threat Modeling", "Design Patterns"] },
    { id: 5, name: "Security Misconfiguration", desc: "Insecure configurations in any part of the application stack.", link: "/security-misconfiguration", image: "/securitymissconfiguration.png", color: "#3b82f6", details: "Misconfigurations at any level — network, platform, web server, database, frameworks. Includes missing headers and verbose error messages.", tags: ["Headers", "Default Creds", "Debug"] },
    { id: 6, name: "Vulnerable Components", desc: "Using components with known vulnerabilities that compromise applications.", link: "/vulnerable-components", image: "./vulnerablecomponent.png", color: "#ec4899", details: "Applications rely on libraries and frameworks. If a vulnerable component is exploited, it can lead to data loss or full server takeover.", tags: ["Dependencies", "CVE", "Patching"] },
    { id: 7, name: "Authentication Failures", desc: "Broken authentication allowing credential stuffing and session hijacking.", link: "/authentication-failures", image: "./authunticationfailures.png", color: "#14b8a6", details: "Incorrectly implemented authentication allowing attackers to compromise passwords, keys, or session tokens to assume other users' identities.", tags: ["Sessions", "MFA", "Brute Force"] },
    { id: 8, name: "Software & Data Integrity", desc: "Software updates and CI/CD pipelines without integrity verification.", link: "/software-data-integrity", image: "./softwaredataintegrity.png", color: "#f97316", details: "Code and infrastructure that does not protect against integrity violations. Relying on plugins or modules from untrusted sources without verification.", tags: ["CI/CD", "Supply Chain", "Signatures"] },
    { id: 9, name: "Security Logging Failures", desc: "Failures in logging and monitoring that prevent threat detection.", link: "/security-logging-failures", image: "./securityloggingfailure.png", color: "#6366f1", details: "Without logging and monitoring, breaches cannot be detected. Attackers rely on the lack of monitoring to achieve their goals undetected.", tags: ["SIEM", "Monitoring", "Audit Trail"] },
    { id: 10, name: "Server-Side Request Forgery", desc: "Fetching remote resources without validating user-supplied URLs.", link: "/server-side-request-forgery", image: "/serversideforgery.png", color: "#06b6d4", details: "SSRF occurs when a web app fetches a remote resource without validating the URL. Attackers coerce the app to send requests to unexpected destinations.", tags: ["SSRF", "Cloud Metadata", "Firewall"] }
  ];

  const newVulnerabilities2025 = [
    { id: "N1", name: "Software Supply Chain Failures", desc: "Covers the entire software ecosystem — dependencies, build systems, and distribution.", link: "/software-supply-chain-failures", image: "./SSCF.png", color: "#ff4757", isNew: true, details: "With supply chain attacks like SolarWinds and Log4j, securing the entire supply chain is critical — dependencies, build tools, and external scripts.", tags: ["SolarWinds", "Log4j", "SBOMs"] },
    { id: "N2", name: "Mishandling of Exceptional Conditions", desc: "Secure error handling, logical flaws, and insecure failure states.", link: "/mishandling-exceptional-conditions", image: "/MofExcepCond.png", color: "#ff6348", isNew: true, details: "Improper error handling can reveal stack traces or internal IPs. Failing to securely handle exceptions can lead to business rule bypasses or DoS.", tags: ["Error Handling", "Stack Traces", "DoS"] }
  ];

  const marqueeItems = [...vulnerabilities, ...vulnerabilities, ...vulnerabilities];

  const buttonLabel = view === 'marquee' ? '↗ Expand View'
    : view === 'expanded' ? '↙ Collapse'
      : '↗ Expand View';

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>OWASP Top 10 Vulnerabilities</h1>
          <div className={styles.headerActions}>
            {view !== 'marquee' && (
              <button className={styles.marqueeBtn} onClick={() => setView('marquee')}>
                ▶ Auto Scroll
              </button>
            )}
            <button className={styles.toggleBtn} onClick={handleToggle}>
              {buttonLabel}
            </button>
          </div>
        </div>
        <p className={styles.subtitle}>
          The most critical web application security risks identified by the Open Web Application Security Project
        </p>

        {/* ── Views ── */}
        <AnimatePresence mode="wait">
          {/* ═══ MARQUEE: default scrolling ═══ */}
          {view === 'marquee' && (
            <motion.div
              key="marquee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.marqueeWrapper}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className={styles.marqueeTrack} style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
                {marqueeItems.map((vuln, i) => (
                  <div key={`m-${vuln.id}-${i}`} className={styles.marqueeItem}>
                    <a href={vuln.link} className={styles.mCard} style={{ '--accent': vuln.color }}
                      onClick={(e) => { e.preventDefault(); window.location.href = vuln.link; }}>
                      <div className={styles.mImage}>
                        <img src={vuln.image} alt={vuln.name} onError={(e) => { e.target.src = `https://via.placeholder.com/400x200/667eea/ffffff?text=${encodeURIComponent(vuln.name)}`; }} />
                        <div className={styles.mOverlay}><span className={styles.mNum}>{vuln.id}</span></div>
                      </div>
                      <div className={styles.mBody}>
                        <h3 className={styles.mTitle}>{vuln.name}</h3>
                        <p className={styles.mDesc}>{vuln.desc}</p>
                        <div className={styles.mTags}>
                          {vuln.tags.slice(0, 2).map(t => <span key={t} className={styles.tag}>{t}</span>)}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══ EXPANDED: 3-col detailed grid ═══ */}
          {view === 'expanded' && (
            <motion.div
              key="expanded"
              className={styles.expGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
            >
              {vulnerabilities.map((vuln, i) => (
                <motion.div key={vuln.id} className={styles.expCard} style={{ '--accent': vuln.color }}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <div className={styles.expImage}>
                    <img src={vuln.image} alt={vuln.name} onError={(e) => { e.target.src = `https://via.placeholder.com/400x200/667eea/ffffff?text=${encodeURIComponent(vuln.name)}`; }} />
                    <a href={vuln.link} className={styles.detailsBtn} onClick={(e) => { e.preventDefault(); window.location.href = vuln.link; }}>🔗 Details</a>
                    <div className={styles.expOverlay}><span className={styles.expNum}>{vuln.id}</span></div>
                  </div>
                  <div className={styles.expBody}>
                    <h3 className={styles.expTitle} style={{ borderLeftColor: vuln.color }}>{vuln.name}</h3>
                    <p className={styles.expDesc}>{vuln.desc}</p>
                    <p className={styles.expDetails}>{vuln.details}</p>
                    <div className={styles.expTags}>{vuln.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ═══ GRID: 5×2 collapsed ═══ */}
          {view === 'grid' && (
            <motion.div
              key="grid"
              className={styles.gridCollapsed}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {vulnerabilities.map((vuln, i) => (
                <motion.a key={vuln.id} href={vuln.link} className={styles.gCard} style={{ '--accent': vuln.color }}
                  onClick={(e) => { e.preventDefault(); window.location.href = vuln.link; }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.35)' }}>
                  <div className={styles.gImage}>
                    <img src={vuln.image} alt={vuln.name} onError={(e) => { e.target.src = `https://via.placeholder.com/400x200/667eea/ffffff?text=${encodeURIComponent(vuln.name)}`; }} />
                    <div className={styles.gOverlay}><span className={styles.gNum}>{vuln.id}</span></div>
                  </div>
                  <div className={styles.gBody}>
                    <h3 className={styles.gTitle}>{vuln.name}</h3>
                    <p className={styles.gDesc}>{vuln.desc}</p>
                    <div className={styles.gTags}>{vuln.tags.slice(0, 2).map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 2025 Section ── */}
        <div className={styles.newHeader}>
          <div className={styles.newBadge}>NEW</div>
          <h2 className={styles.newTitle}>OWASP Draft 2025</h2>
          <p className={styles.newSubtitle}>Newly identified risks added to the upcoming OWASP Top 10 revision</p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.dynamicGrid}>
          {newVulnerabilities2025.map((vuln, i) => (
            <motion.div key={vuln.id} className={styles.dynamicWrap}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.2, duration: 0.6 }}>
              <div className={styles.glowBorder}></div>
              <div className={`${styles.expCard} ${styles.featuredCard}`} style={{ '--accent': vuln.color }}>
                <div className={styles.expImage}>
                  <div className={styles.newSticker}>NEW 2025</div>
                  <img src={vuln.image} alt={vuln.name} onError={(e) => { e.target.src = `https://via.placeholder.com/400x200/ff4757/ffffff?text=${encodeURIComponent(vuln.name)}`; }} />
                  <a href={vuln.link} className={styles.detailsBtn} onClick={(e) => { e.preventDefault(); window.location.href = vuln.link; }}>🔗 Details</a>
                  <div className={styles.expOverlay}><span className={styles.expNum}>{vuln.id}</span></div>
                </div>
                <div className={styles.expBody}>
                  <h3 className={styles.expTitle} style={{ borderLeftColor: vuln.color }}>{vuln.name}</h3>
                  <p className={styles.expDesc}>{vuln.desc}</p>
                  <p className={styles.expDetails}>{vuln.details}</p>
                  <div className={styles.expTags}>{vuln.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OWASPTop10;
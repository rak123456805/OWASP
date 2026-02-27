import React, { useState, useRef, useEffect } from 'react';
import '../../../index.css';
import '../../vulnerable-components/assets/VulnerabilityPage.css';
import '../../broken-access-control/assets/BrokenAccessControl.css';
import '../assets/AuthenticationSandbox.css';
// reuse bac-hero styles

const LOCAL_USERS_KEY = 'xploitsim_users_v1';
const LOCAL_LOG_KEY = 'xploitsim_attacklog_v1';

const DEFAULT_USERS = [
  { username: 'alice', password: 'Password@123', attempts: 0, lockedUntil: 0 },
  { username: 'bob', password: 'qwerty', attempts: 0, lockedUntil: 0 },
  { username: 'admin', password: 'admin123', attempts: 0, lockedUntil: 0 }
];

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 60 * 1000;

export default function AuthenticationSandbox() {
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_USERS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.map(u => ({ attempts: 0, lockedUntil: 0, ...u }));
      }
    } catch { }
    return DEFAULT_USERS.slice();
  });

  const [attackLog, setAttackLog] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_LOG_KEY);
      if (raw) return JSON.parse(raw);
    } catch { }
    return [];
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Try logging in. Hint: bob / qwerty or admin / admin123');
  const [isSimulating, setIsSimulating] = useState(false);
  const simCancelRef = useRef(false);
  const consoleRef = useRef(null);

  // Replay controls (kept if used later)
  // eslint-disable-next-line no-unused-vars
  const [replayIndex, setReplayIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isReplaying, setIsReplaying] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const replayTimerRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const REPLAY_INTERVAL_MS = 700;

  // Persist users and logs
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    } catch { }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_LOG_KEY, JSON.stringify(attackLog));
    } catch { }
  }, [attackLog]);

  // Prevent page jump on log updates — only auto-scroll console if near bottom
  useEffect(() => {
    const el = consoleRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (isNearBottom) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [attackLog]);

  function pushLog(text) {
    const ts = new Date().toLocaleTimeString();
    setAttackLog(prev => [...prev, { ts, text }]);
  }

  function updateUser(uname, fields) {
    setUsers(prev => prev.map(u => (u.username === uname ? { ...u, ...fields } : u)));
  }

  function isCurrentlyLocked(user) {
    if (!user || !user.lockedUntil) return false;
    const now = Date.now();
    if (user.lockedUntil > now) return true;
    updateUser(user.username, { lockedUntil: 0, attempts: 0 });
    return false;
  }

  function maskedUsers() {
    return users.map(u => {
      const pw = u.password || '';
      const masked = pw.length <= 2 ? pw : pw[0] + '*'.repeat(Math.max(0, pw.length - 2)) + pw.slice(-1);
      const attempts = u.attempts || 0;
      const remaining = Math.max(0, MAX_ATTEMPTS - attempts);
      const lockedNow = (u.lockedUntil || 0) > Date.now();
      return { username: u.username, masked, remaining, lockedNow, attempts };
    });
  }

  function handleLogin(e) {
    e?.preventDefault?.();
    const uname = username.trim();
    if (!uname) {
      setMessage('Enter a username.');
      return;
    }
    const user = users.find(u => u.username === uname);

    if (user && isCurrentlyLocked(user)) {
      setMessage('🔒 Account locked (simulated).');
      pushLog(`Attempted login for ${uname} while locked`);
      return;
    }

    if (!user) {
      setMessage('❌ Unknown user.');
      pushLog(`Failed login attempt: ${uname} (unknown user)`);
      return;
    }

    if (user.password === password) {
      setMessage(`✅ Welcome, ${uname}!`);
      pushLog(`Successful login: ${uname}`);
      updateUser(uname, { attempts: 0, lockedUntil: 0 });
    } else {
      const newAttempts = (user.attempts || 0) + 1;
      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCK_DURATION_MS;
        updateUser(uname, { attempts: newAttempts, lockedUntil: until });
        setMessage('🔒 Too many failed attempts — account locked.');
        pushLog(`Failed login attempt: ${uname} (attempt ${newAttempts})`);
        pushLog(`Account ${uname} locked until ${new Date(until).toLocaleTimeString()}`);
      } else {
        updateUser(uname, { attempts: newAttempts });
        setMessage('❌ Invalid username or password.');
        pushLog(`Failed login attempt: ${uname} (attempt ${newAttempts})`);
      }
    }
  }

  function handleRegister() {
    const uname = username.trim();
    if (!uname || !password) {
      setMessage('Enter username and password to register.');
      return;
    }
    if (users.some(u => u.username === uname)) {
      setMessage('User already exists.');
      return;
    }
    setUsers(prev => [...prev, { username: uname, password, attempts: 0, lockedUntil: 0 }]);
    setMessage(`✅ Registered ${uname} (in-memory).`);
    pushLog(`Registered new user: ${uname}`);
  }

  function resetDemo() {
    setUsers(prev => prev.map(u => ({ ...u, attempts: 0, lockedUntil: 0 })));
    setAttackLog([]);
    setMessage('Demo reset.');
    pushLog('Demo reset.');
  }

  async function runCredentialStuffingAsync() {
    const common = ['123456', 'password', 'qwerty', 'admin', 'admin123'];
    const targets = Array.from(new Set([...users.map(u => u.username), 'carol', 'dave']));

    setIsSimulating(true);
    simCancelRef.current = false;
    pushLog('--- Credential Stuffing Simulation started ---');

    for (const t of targets) {
      if (simCancelRef.current) break;

      const user = users.find(u => u.username === t);
      if (user && isCurrentlyLocked(user)) {
        pushLog(`${t}: <LOCKED>`);
        continue;
      }

      for (const pw of common) {
        if (simCancelRef.current) break;
        await new Promise(r => setTimeout(r, 250));

        const fresh = users.find(u => u.username === t);
        if (!fresh) {
          pushLog(`${t}:${pw} -> FAIL (no user)`);
          continue;
        }
        if (isCurrentlyLocked(fresh)) {
          pushLog(`${t}:${pw} -> FAIL (LOCKED)`);
          continue;
        }
        if (fresh.password === pw) {
          updateUser(fresh.username, { attempts: 0, lockedUntil: 0 });
          pushLog(`${t}:${pw} -> SUCCESS`);
        } else {
          const newAttempts = (fresh.attempts || 0) + 1;
          if (newAttempts >= MAX_ATTEMPTS) {
            const until = Date.now() + LOCK_DURATION_MS;
            updateUser(fresh.username, { attempts: newAttempts, lockedUntil: until });
            pushLog(`${t}:${pw} -> FAIL (attempt ${newAttempts})`);
            pushLog(`${t} locked until ${new Date(until).toLocaleTimeString()}`);
          } else {
            updateUser(fresh.username, { attempts: newAttempts });
            pushLog(`${t}:${pw} -> FAIL (attempt ${newAttempts})`);
          }
        }
      }
    }

    pushLog('--- Credential Stuffing Simulation completed ---');
    setIsSimulating(false);
  }

  return (
    <div className="broken-access-page">
      {/* Hero Section */}
      <section className="bac-hero">
        <div className="bac-hero-content">
          <div className="bac-hero-text">
            <div className="bac-badge">A02:2021</div>
            <h1 className="bac-title">Authentication Failures Sandbox</h1>
            <p className="bac-subtitle">
              Explore login attempt tracking, credential stuffing, and simulated account lockouts — all in-browser and persistent.
            </p>
          </div>
        </div>
      </section>

      <main className="vp-container">
        <div style={{ maxWidth: 1100, margin: '0 auto 2rem auto', padding: '1.5rem', background: 'rgba(255,205,88,0.05)', borderRadius: '12px', border: '1px solid rgba(255,205,88,0.2)' }}>
          <h3 style={{ color: '#ffcd58', marginTop: 0 }}>🎯 Your Mission</h3>
          <p style={{ fontSize: '15px', color: '#d1d5db', marginBottom: '1rem' }}>
            Test the strengths and weaknesses of this authentication system.
          </p>
          <ol style={{ fontSize: '14px', color: '#d1d5db', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            <li><strong>Manual Brute Force:</strong> Try logging in as <code>admin</code> with several wrong passwords. Notice how the "Remaining Attempts" counter decreases.</li>
            <li><strong>Observe Lockout:</strong> After 5 failed attempts, the account will be 🔒 LOCKED for 60 seconds. Try to log in again while locked to see the system's defense.</li>
            <li><strong>Automated Attack:</strong> Click "Start Credential Stuffing". This simulates an attacker trying a list of common passwords across many accounts. Watch the Attack Log to see which accounts are compromised.</li>
          </ol>
        </div>

        <div className="vp-grid" style={{ maxWidth: 1100, gap: 16, margin: '0 auto' }}>
          {/* LEFT PANEL */}
          <div className="vp-card" style={{ textAlign: 'center' }}>
            <h3>Login / Register</h3>

            <form onSubmit={handleLogin} className="vp-form" style={{ marginTop: 8 }}>
              <label>Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="vp-input"
                style={{ marginBottom: 10 }}
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="vp-input"
                style={{ marginBottom: 15 }}
              />

              <div style={{ marginTop: 12 }}>
                <button className="vp-btn" type="submit">Login</button>
                <button
                  type="button"
                  className="vp-btn vp-btn-secondary"
                  onClick={handleRegister}
                  style={{ marginLeft: 8 }}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="vp-btn vp-btn-secondary"
                  onClick={resetDemo}
                  style={{ marginLeft: 8 }}
                >
                  Reset Demo
                </button>
              </div>
            </form>

            <p className="vp-note" style={{ marginTop: 10 }}>{message}</p>

            <div style={{ marginTop: 12 }}>
              {!isSimulating ? (
                <button className="vp-btn vp-btn-danger" onClick={runCredentialStuffingAsync}>Start Credential Stuffing</button>
              ) : (
                <button className="vp-btn vp-btn-secondary" onClick={() => { simCancelRef.current = true; setIsSimulating(false); }}>
                  Stop Simulation
                </button>
              )}
            </div>

            <div style={{ marginTop: 16 }}>
              <h4>Registered Users</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 8 }}>
                {maskedUsers().map(u => (
                  <div key={u.username} style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: 10 }}>
                    <div style={{ fontWeight: 700 }}>{u.username}{u.lockedNow ? ' 🔒' : ''}</div>
                    <div style={{ fontSize: 12 }}>{u.masked}</div>
                    <div style={{ marginTop: 6, fontSize: 13 }}>
                      Attempts: <strong>{u.attempts}</strong><br />
                      Remaining: <strong>{u.remaining}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="vp-card" style={{ flex: 1 }}>
            <h3>Attack Log</h3>
            <div
              ref={consoleRef}
              className="vp-log"
              style={{
                background: '#0b1020',
                color: '#d1d5db',
                fontFamily: 'ui-monospace, Menlo, Monaco, monospace',
                padding: 12,
                borderRadius: 8,
                minHeight: 260,
                maxHeight: 360,
                overflowY: 'auto',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              {attackLog.length === 0 ? (
                <div style={{ opacity: 0.7 }}>Console empty — perform logins or start simulation.</div>
              ) : (
                attackLog.map((entry, i) => (
                  <div key={i} style={{ marginBottom: 6 }}>
                    <span style={{ color: '#9ca3af' }}>[{entry.ts}] </span>
                    <span>{entry.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
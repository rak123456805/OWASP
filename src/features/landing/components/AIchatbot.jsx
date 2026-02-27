import React, { useState, useEffect, useRef } from 'react';

// ─── Built-in bot knowledge base ─────────────────────────────────────────────
const BOT_KNOWLEDGE = [
    "Great question! I can help with any OWASP Top 10 vulnerability. What would you like to know?",
    "SQL Injection (A03) occurs when attackers manipulate queries with untrusted data. Always use parameterized queries or prepared statements!",
    "Broken Access Control (A01) is the #1 OWASP risk in 2025. Enforce the principle of least privilege and deny access by default.",
    "Cryptographic Failures (A02) expose sensitive data due to weak encryption. Use AES-256 and TLS 1.3 as your baseline.",
    "Insecure Design (A04) means security wasn't considered early. Start threat modeling in the design phase — not after deployment.",
    "Security Misconfiguration (A05) is extremely common. Disable default credentials, remove unused features, and automate hardening checks.",
    "XSS (Cross-Site Scripting) lets attackers inject malicious client-side scripts. Always escape output and use a strong Content-Security-Policy.",
    "SSRF (A10) tricks the server into making unintended internal requests. Validate all user-supplied URLs and block private IP ranges.",
    "Vulnerable & Outdated Components (A06): run `npm audit` or your equivalent regularly, and never ignore critical CVEs.",
    "Security Logging Failures (A09): Log all authentication events, access-control failures, and input-validation errors — but never log passwords!",
    "Software Integrity Failures (A08): verify checksums on dependencies and use signed packages. Supply chain attacks are real.",
];

let rIdx = 0;
const nextBotReply = () => {
    const r = BOT_KNOWLEDGE[rIdx % BOT_KNOWLEDGE.length];
    rIdx++;
    return r;
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const BotSVG = () => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <rect x="8" y="14" width="32" height="24" rx="6" fill="white" fillOpacity="0.9" />
        <circle cx="18" cy="26" r="3" fill="#6d28d9" />
        <circle cx="30" cy="26" r="3" fill="#6d28d9" />
        <rect x="20" y="32" width="8" height="3" rx="1.5" fill="#6d28d9" />
        <rect x="22" y="8" width="4" height="6" rx="2" fill="white" fillOpacity="0.9" />
        <circle cx="24" cy="7" r="2.5" fill="white" fillOpacity="0.9" />
        <rect x="4" y="22" width="4" height="8" rx="2" fill="white" fillOpacity="0.65" />
        <rect x="40" y="22" width="4" height="8" rx="2" fill="white" fillOpacity="0.65" />
    </svg>
);

const SendSVG = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="17" height="17">
        <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const AIchatbot = () => {
    const [showFab, setShowFab] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showIntro, setShowIntro] = useState(true);   // robot intro section
    const [messages, setMessages] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Show FAB after 200 px scroll
    useEffect(() => {
        const onScroll = () => setShowFab(window.scrollY > 200);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Auto-scroll on new messages
    useEffect(() => {
        if (isOpen && !isMinimized) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isOpen, isMinimized]);

    // Focus input when chat opens / expands
    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => inputRef.current?.focus(), 320);
        }
    }, [isOpen, isMinimized]);

    // Reset intro when chat is re-opened
    useEffect(() => {
        if (isOpen) setShowIntro(messages.length === 0);
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
        setIsMinimized(false);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsMinimized(false);
    };

    const handleMinimize = () => setIsMinimized(p => !p);

    const handleSend = () => {
        const text = inputVal.trim();
        if (!text) return;

        // Hide intro after first message
        if (showIntro) setShowIntro(false);

        const userMsg = { id: Date.now(), role: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputVal('');
        setIsTyping(true);

        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, role: 'bot', text: nextBotReply() };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000 + Math.random() * 700);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* ── Floating Action Button ── */}
            <button
                className={`cb-fab${showFab ? ' cb-fab--on' : ''}`}
                onClick={handleOpen}
                aria-label="Open AI Security Assistant"
                style={{ display: isOpen ? 'none' : undefined }}
            >
                <BotSVG />
                <span className="cb-fab__ring" />
            </button>

            {/* ── Chat Window ── */}
            {isOpen && (
                <div className={`cb-window${isMinimized ? ' cb-window--mini' : ' cb-window--open'}`}>

                    {/* ── Robot GIF overhanging the top border ── */}
                    <div className={`cb-intro-avatar${showIntro ? ' cb-intro-avatar--on' : ' cb-intro-avatar--off'}`}>
                        <img src="/robo.gif" alt="AI Robot" className="cb-intro-avatar__gif" />
                    </div>

                    {/* ── Header ── */}
                    <div className="cb-header">
                        <div className="cb-header__left">
                            <div className="cb-header__dot" />
                            <div>
                                <div className="cb-header__title">XploitBot</div>
                                <div className="cb-header__sub">Online · Ready to help</div>
                            </div>
                        </div>
                        <div className="cb-header__btns">
                            <button className="cb-header__btn" onClick={handleMinimize} title={isMinimized ? 'Expand' : 'Minimize'}>
                                {isMinimized ? '▲' : '–'}
                            </button>
                            <button className="cb-header__btn cb-header__btn--x" onClick={handleClose} title="Close">
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* ── Body (hidden when minimized) ── */}
                    {!isMinimized && (
                        <>
                            <div className="cb-body">
                                {/* Welcome intro section */}
                                <div className={`cb-intro${showIntro ? ' cb-intro--on' : ' cb-intro--off'}`}>
                                    <div className="cb-intro__space" />
                                    <p className="cb-intro__greeting">👋 Hello! I'm your AI Security Assistant.</p>
                                    <p className="cb-intro__hint">Ask me anything about OWASP Top 10, vulnerabilities, or web security best practices.</p>
                                </div>

                                {/* Messages */}
                                <div className="cb-messages">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`cb-bubble cb-bubble--${msg.role}`}>
                                            {msg.role === 'bot' && <span className="cb-bubble__emoji">🤖</span>}
                                            <div className="cb-bubble__text">{msg.text}</div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="cb-bubble cb-bubble--bot">
                                            <span className="cb-bubble__emoji">🤖</span>
                                            <div className="cb-bubble__text cb-dots">
                                                <span /><span /><span />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* ── Footer ── */}
                            <div className="cb-footer">
                                <input
                                    ref={inputRef}
                                    className="cb-input"
                                    type="text"
                                    placeholder="Ask about web security..."
                                    value={inputVal}
                                    onChange={e => setInputVal(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    maxLength={300}
                                />
                                <button
                                    className="cb-send"
                                    onClick={handleSend}
                                    disabled={!inputVal.trim()}
                                    aria-label="Send"
                                >
                                    <SendSVG />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default AIchatbot;

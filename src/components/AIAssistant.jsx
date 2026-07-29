import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Volume2, VolumeX,
  Sparkles, ChevronDown, Loader, Calendar,
  Mail, Download, CheckCircle,
  AlertCircle, Phone, ExternalLink, Link, Code
} from 'lucide-react';
import { PORTFOLIO_CONTEXT, SECTION_CONTEXTS, SMART_QA } from '../data/assistantContext';
import { speak, stopVoice, getVoiceProvider } from '../utils/voiceEngine';
import {
  detectIntent, ACTION_RESPONSES,
  sendEmail, openSchedule, openLinkedIn, openGitHub, openResume, copyDiscord,
  CONTACT
} from '../utils/agentActions';
import './AIAssistant.css';

// ─── Gemini API ───────────────────────────────────────────────
const geminiRespond = async (userMessage) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: PORTFOLIO_CONTEXT + '\n\nUser: ' + userMessage }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 180, topP: 0.9 },
          systemInstruction: { parts: [{ text: 'You are Manish\'s portfolio AI guide. Give very concise answers (2–4 sentences). Be helpful, confident, and technically precise. Never mention you have limited internet access.' }] }
        }),
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch { return null; }
};

// ─── Smart Fallback ───────────────────────────────────────────
const smartRespond = (input) => {
  const lower = input.toLowerCase();
  for (const qa of SMART_QA) {
    if (qa.triggers.some(t => lower.includes(t))) return qa.response;
  }
  return `I'm Manish's AI guide! Ask me about his experience, skills, projects, or impact — or say "email Manish", "schedule a call", or "show resume".`;
};

// ─── Email Form Component ─────────────────────────────────────
const EmailForm = ({ onClose, onSuccess }) => {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus]  = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) return;
    setStatus('sending');
    const result = await sendEmail(fields);
    setStatus(result.ok ? 'sent' : 'error');
    if (result.ok) onSuccess?.(`Message sent from ${fields.name}! Manish will get back to you soon.`);
  };

  if (status === 'sent') return (
    <div className="action-card success">
      <CheckCircle size={22} className="action-icon success-icon" />
      <p>Message sent! Manish will reply to <strong>{fields.email}</strong> soon.</p>
      <button className="action-btn secondary" onClick={onClose}>Close</button>
    </div>
  );

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <input className="form-input" placeholder="Your Name" value={fields.name}
          onChange={e => setFields(f => ({ ...f, name: e.target.value }))} required />
      </div>
      <div className="form-field">
        <input className="form-input" type="email" placeholder="Your Email" value={fields.email}
          onChange={e => setFields(f => ({ ...f, email: e.target.value }))} required />
      </div>
      <div className="form-field">
        <textarea className="form-input" rows={3} placeholder="Your message…" value={fields.message}
          onChange={e => setFields(f => ({ ...f, message: e.target.value }))} required />
      </div>
      {status === 'error' && (
        <p className="form-error"><AlertCircle size={13} /> Something went wrong. Try again.</p>
      )}
      <div className="form-actions">
        <button type="button" className="action-btn secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="action-btn primary" disabled={status === 'sending'}>
          {status === 'sending' ? <><Loader size={13} className="spin" /> Sending…</> : <><Send size={13} /> Send Message</>}
        </button>
      </div>
    </form>
  );
};

// ─── Action Cards ─────────────────────────────────────────────
const ActionCard = ({ action, onEmailSuccess, onDismiss }) => {
  const [emailOpen, setEmailOpen] = useState(action === 'email_form');

  if (action === 'email_form') return (
    <div className="action-card">
      <div className="action-card-header">
        <Mail size={15} className="action-icon" />
        <span>Send Manish a message</span>
      </div>
      {emailOpen
        ? <EmailForm onClose={onDismiss} onSuccess={onEmailSuccess} />
        : <button className="action-btn primary" onClick={() => setEmailOpen(true)}>
            <Mail size={13} /> Open Contact Form
          </button>
      }
    </div>
  );

  if (action === 'schedule_card' || action === 'contact_card') return (
    <div className="action-card">
      <div className="action-card-header">
        <Calendar size={15} className="action-icon" />
        <span>Get in touch with Manish</span>
      </div>
      <p className="action-desc">Email to schedule a call, or connect directly on LinkedIn.</p>
      <div className="action-btn-row">
        <button className="action-btn primary" onClick={() => window.open(`mailto:${CONTACT.email}?subject=${encodeURIComponent("Let's connect — Scheduling a call")}`, '_blank')}>
          <Mail size={13} /> Email to Schedule
        </button>
        <button className="action-btn secondary" onClick={openLinkedIn}>
          <ExternalLink size={13} /> LinkedIn
        </button>
      </div>
      <p className="action-contact-line">📧 {CONTACT.email} &nbsp;|&nbsp; 📱 (+91) 8015973380</p>
    </div>
  );

  if (action === 'resume_card') return (
    <div className="action-card">
      <div className="action-card-header">
        <Download size={15} className="action-icon" />
        <span>Manish's Resume</span>
      </div>
      <button className="action-btn primary" onClick={openResume}>
        <Download size={13} /> Download / View PDF
      </button>
    </div>
  );

  if (action === 'linkedin_card') return (
    <div className="action-card">
      <div className="action-card-header">
        <Link size={15} className="action-icon" />
        <span>LinkedIn Profile</span>
      </div>
      <button className="action-btn primary" onClick={openLinkedIn}>
        <ExternalLink size={13} /> Open LinkedIn
      </button>
    </div>
  );

  if (action === 'github_card') return (
    <div className="action-card">
      <div className="action-card-header">
        <Code size={15} className="action-icon" />
        <span>GitHub</span>
      </div>
      <button className="action-btn primary" onClick={openGitHub}>
        <ExternalLink size={13} /> Open GitHub
      </button>
    </div>
  );

  if (action === 'discord_card') return (
    <div className="action-card">
      <div className="action-card-header">
        <MessageCircle size={15} className="action-icon" />
        <span>Discord</span>
      </div>
      <p className="action-desc">Handle: <strong>manishjaiswal9689</strong></p>
      <button className="action-btn primary" onClick={() => { copyDiscord(); }}
        title="Copies handle to clipboard">
        Copy Handle
      </button>
    </div>
  );

  return null;
};

// ─── Main AIAssistant Component ───────────────────────────────
const AIAssistant = () => {
  const [chatOpen, setChatOpen]     = useState(false);
  const [messages, setMessages]     = useState([{
    role: 'assistant',
    text: `Hi! 👋 I'm Manish's AI guide. Ask me anything — his experience, skills, or impact. You can also say *"email Manish"*, *"schedule a call"*, or *"show resume"*.`,
    action: null,
  }]);
  const [input, setInput]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [speaking, setSpeaking]     = useState(false);
  const [voiceProvider, setVoiceProvider] = useState('');

  // Hover tooltip state
  const [hoveredSection, setHoveredSection] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipSpeaking, setTooltipSpeaking] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef   = useRef(null);
  const hoverTimer = useRef(null);

  useEffect(() => {
    setVoiceProvider(getVoiceProvider());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [chatOpen]);

  // ─── Section Hover Detection ────────────────────────────────
  useEffect(() => {
    const keys = Object.keys(SECTION_CONTEXTS);
    const onEnter = (e) => {
      const sec = e.target.closest('[data-section]');
      if (!sec) return;
      const key = sec.getAttribute('data-section');
      if (!keys.includes(key)) return;
      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => {
        setHoveredSection({ key, ...SECTION_CONTEXTS[key] });
        setTooltipVisible(true);
      }, 500);
    };
    const onLeave = (e) => {
      const sec = e.target.closest('[data-section]');
      if (!sec) return;
      if (e.relatedTarget?.closest('.ai-hover-tooltip')) return;
      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => {
        setTooltipVisible(false);
        setTooltipSpeaking(false);
        stopVoice();
      }, 400);
    };
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      clearTimeout(hoverTimer.current);
    };
  }, []);

  const keepTooltip = () => clearTimeout(hoverTimer.current);
  const leaveTooltip = () => {
    hoverTimer.current = setTimeout(() => {
      setTooltipVisible(false);
      setTooltipSpeaking(false);
      stopVoice();
    }, 400);
  };

  // ─── Tooltip Speak ──────────────────────────────────────────
  const handleTooltipSpeak = useCallback(() => {
    if (!hoveredSection) return;
    if (tooltipSpeaking) { stopVoice(); setTooltipSpeaking(false); return; }
    setTooltipSpeaking(true);
    speak(hoveredSection.voice, {
      onStart: () => setTooltipSpeaking(true),
      onEnd: () => setTooltipSpeaking(false),
    });
  }, [hoveredSection, tooltipSpeaking]);

  // ─── Tooltip → Chat ─────────────────────────────────────────
  const handleTooltipAsk = useCallback(() => {
    if (!hoveredSection) return;
    setTooltipVisible(false);
    stopVoice();
    pushMessages([
      { role: 'user', text: `Quick summary of the ${hoveredSection.title} section?`, action: null },
      { role: 'assistant', text: hoveredSection.summary, action: null },
    ]);
    setChatOpen(true);
  }, [hoveredSection]);

  // ─── Chat Helpers ────────────────────────────────────────────
  const pushMessages = (newMsgs) => setMessages(prev => [...prev, ...newMsgs]);

  const speakText = useCallback((text) => {
    if (voiceMuted) return;
    setSpeaking(true);
    speak(text, { onEnd: () => setSpeaking(false) });
  }, [voiceMuted]);

  // ─── Send Message ────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;
    setInput('');

    // Check for agent intent first
    const intent = detectIntent(trimmed);
    if (intent && ACTION_RESPONSES[intent]) {
      const ar = ACTION_RESPONSES[intent];
      pushMessages([
        { role: 'user', text: trimmed, action: null },
        { role: 'assistant', text: ar.text, action: ar.action },
      ]);
      speakText(ar.text);
      return;
    }

    pushMessages([{ role: 'user', text: trimmed, action: null }]);
    setLoading(true);

    let reply = await geminiRespond(trimmed);
    if (!reply) reply = smartRespond(trimmed);

    setLoading(false);
    pushMessages([{ role: 'assistant', text: reply, action: null }]);
    speakText(reply);
  }, [input, loading, voiceMuted, speakText]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const toggleVoice = () => {
    if (!voiceMuted) stopVoice();
    setVoiceMuted(v => !v);
    setSpeaking(false);
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <>
      {/* ── Hover Tooltip ───────────────────────────────── */}
      <AnimatePresence>
        {tooltipVisible && hoveredSection && (
          <motion.div
            className="ai-hover-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            onMouseEnter={keepTooltip}
            onMouseLeave={leaveTooltip}
          >
            <div className="tooltip-header">
              <span className="tooltip-emoji">{hoveredSection.emoji}</span>
              <span className="tooltip-title">{hoveredSection.title}</span>
              <span className="tooltip-badge">AI Guide</span>
            </div>
            <p className="tooltip-tagline">✨ I'm your personal assistant — I can explain this section</p>
            <div className="tooltip-actions">
              <button
                className={`tooltip-btn speak ${tooltipSpeaking ? 'active' : ''}`}
                onClick={handleTooltipSpeak}
              >
                {tooltipSpeaking ? <><VolumeX size={12} /> Stop</> : <><Volume2 size={12} /> Read Aloud</>}
              </button>
              <button className="tooltip-btn ask" onClick={handleTooltipAsk}>
                <MessageCircle size={12} /> Quick Summary
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ─────────────────────────────────────────── */}
      <div className="chat-fab-wrapper">
        <AnimatePresence>
          {!chatOpen && (
            <motion.div className="chat-fab-label"
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }} transition={{ delay: 2.5 }}
            >
              Ask me anything!
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className={`chat-fab ${chatOpen ? 'open' : ''}`}
          onClick={() => setChatOpen(o => !o)}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
        >
          <AnimatePresence mode="wait">
            {chatOpen
              ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.span>
              : <motion.span key="sp" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><Sparkles size={22} /></motion.span>
            }
          </AnimatePresence>
          {!chatOpen && <><span className="fab-ring ring-1" /><span className="fab-ring ring-2" /></>}
        </motion.button>
      </div>

      {/* ── Chat Panel ──────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="chat-panel glass-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar"><Sparkles size={15} /></div>
                <div>
                  <div className="chat-name">Manish's AI Guide</div>
                  <div className="chat-status">
                    <span className="status-dot" />
                    {speaking ? 'Speaking…' : loading ? 'Thinking…' : (
                      <span style={{ fontSize: '0.65rem' }}>
                        {voiceProvider}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="chat-header-actions">
                <button className={`chat-icon-btn ${voiceMuted ? 'muted' : ''}`} onClick={toggleVoice} title={voiceMuted ? 'Unmute voice' : 'Mute voice'}>
                  {voiceMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button className="chat-icon-btn" onClick={() => setChatOpen(false)} title="Close">
                  <ChevronDown size={15} />
                </button>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="quick-actions-bar">
              <button className="quick-action-chip email" onClick={() => sendMessage('email Manish')}>
                <Mail size={11} /> Email
              </button>
              <button className="quick-action-chip call" onClick={() => sendMessage('schedule a call')}>
                <Phone size={11} /> Schedule Call
              </button>
              <button className="quick-action-chip resume" onClick={() => sendMessage('view resume')}>
                <Download size={11} /> Resume
              </button>
              <button className="quick-action-chip linkedin" onClick={() => sendMessage('linkedin')}>
                <Link size={11} /> LinkedIn
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="quick-prompts">
              {["His biggest impact?", "Current role?", "What's his stack?", "Open to work?"].map(q => (
                <button key={q} className="quick-chip" onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <motion.div key={i} className={`chat-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {msg.role === 'assistant' && (
                    <div className="msg-avatar"><Sparkles size={10} /></div>
                  )}
                  <div>
                    <div className="msg-bubble">{msg.text}</div>
                    {msg.action && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <ActionCard
                          action={msg.action}
                          onDismiss={() => {}}
                          onEmailSuccess={(txt) => {
                            pushMessages([{ role: 'assistant', text: txt, action: null }]);
                            speakText(txt);
                          }}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div className="chat-msg assistant" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="msg-avatar"><Sparkles size={10} /></div>
                  <div className="msg-bubble typing"><span /><span /><span /></div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-row">
              <input
                ref={inputRef}
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Ask or say "email Manish"…'
                disabled={loading}
              />
              <button className="chat-send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
                {loading ? <Loader size={15} className="spin" /> : <Send size={15} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;

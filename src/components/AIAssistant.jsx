import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Volume2, VolumeX,
  Sparkles, ChevronDown, Mic, MicOff, Loader
} from 'lucide-react';
import { PORTFOLIO_CONTEXT, SECTION_CONTEXTS, SMART_QA } from '../data/assistantContext';
import './AIAssistant.css';

// ─── Voice Synthesis ──────────────────────────────────────────
const speak = (text, onStart, onEnd) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.05;
  utter.volume = 1;
  // Prefer a natural English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.includes('Google') || v.name.includes('Natural') || v.lang === 'en-US'
  );
  if (preferred) utter.voice = preferred;
  utter.onstart = () => onStart?.();
  utter.onend = () => onEnd?.();
  window.speechSynthesis.speak(utter);
};

const stopSpeech = () => window.speechSynthesis?.cancel();

// ─── Smart AI Response (no API key needed) ────────────────────
const smartRespond = (input) => {
  const lower = input.toLowerCase();
  for (const qa of SMART_QA) {
    if (qa.triggers.some(t => lower.includes(t))) return qa.response;
  }
  return `I'm Manish's AI guide! I can tell you about his experience, skills, projects, or impact metrics. Try asking: "What's his biggest impact?" or "What tech does he use?" or "Tell me about Safex".`;
};

// ─── Gemini API Call (if key available) ──────────────────────
const geminiRespond = async (userMessage, history) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null; // Fall through to smart respond

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: PORTFOLIO_CONTEXT + '\n\n---\n\nUser: ' + userMessage }]
    }
  ];

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 180,
          topP: 0.9,
        },
        systemInstruction: {
          parts: [{ text: 'You are Manish\'s portfolio AI guide. Give very concise answers (2–4 sentences). Be helpful, confident, and technically precise.' }]
        }
      })
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch {
    return null;
  }
};

// ─── Main Component ───────────────────────────────────────────
const AIAssistant = () => {
  // Chat state
  const [chatOpen, setChatOpen]       = useState(false);
  const [messages, setMessages]       = useState([{
    role: 'assistant',
    text: `Hi! 👋 I'm Manish's AI guide. Ask me anything about his experience, projects, skills, or impact. I'm here to help!`
  }]);
  const [input, setInput]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [voiceMuted, setVoiceMuted]   = useState(false);
  const [speaking, setSpeaking]       = useState(false);

  // Hover tooltip state
  const [hoveredSection, setHoveredSection] = useState(null); // { key, title, emoji, rect }
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipSpeaking, setTooltipSpeaking] = useState(false);

  const chatEndRef   = useRef(null);
  const inputRef     = useRef(null);
  const hoverTimer   = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [chatOpen]);

  // ─── Section Hover Detection ──────────────────────────────
  useEffect(() => {
    const sectionKeys = Object.keys(SECTION_CONTEXTS);

    const onEnter = (e) => {
      const section = e.target.closest('[data-section]');
      if (!section) return;
      const key = section.getAttribute('data-section');
      if (!sectionKeys.includes(key)) return;

      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        setHoveredSection({
          key,
          ...SECTION_CONTEXTS[key],
          rect: { top: rect.top, right: rect.right }
        });
        setTooltipVisible(true);
      }, 400);
    };

    const onLeave = (e) => {
      const section = e.target.closest('[data-section]');
      if (!section) return;
      const related = e.relatedTarget;
      if (related?.closest('.ai-hover-tooltip')) return; // Moved into tooltip — keep it visible
      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => {
        setTooltipVisible(false);
        setTooltipSpeaking(false);
        stopSpeech();
      }, 300);
    };

    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      clearTimeout(hoverTimer.current);
    };
  }, []);

  // ─── Tooltip: keep visible while hovering tooltip itself ──
  const handleTooltipEnter = useCallback(() => {
    clearTimeout(hoverTimer.current);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    hoverTimer.current = setTimeout(() => {
      setTooltipVisible(false);
      setTooltipSpeaking(false);
      stopSpeech();
    }, 300);
  }, []);

  // ─── Tooltip: Speak ──────────────────────────────────────
  const handleTooltipSpeak = useCallback(() => {
    if (!hoveredSection) return;
    if (tooltipSpeaking) {
      stopSpeech();
      setTooltipSpeaking(false);
      return;
    }
    setTooltipSpeaking(true);
    speak(
      hoveredSection.voice,
      () => setTooltipSpeaking(true),
      () => setTooltipSpeaking(false)
    );
  }, [hoveredSection, tooltipSpeaking]);

  // ─── Tooltip: Open Chat with Context ────────────────────
  const handleTooltipAsk = useCallback(() => {
    if (!hoveredSection) return;
    setTooltipVisible(false);
    stopSpeech();
    setTooltipSpeaking(false);
    // Pre-load the summary into chat
    setMessages(prev => [
      ...prev,
      { role: 'user', text: `Give me a quick summary of the ${hoveredSection.title} section.` },
      { role: 'assistant', text: hoveredSection.summary }
    ]);
    setChatOpen(true);
  }, [hoveredSection]);

  // ─── Chat: Send Message ──────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setLoading(true);

    // Try Gemini first, fall back to smart respond
    let reply = await geminiRespond(trimmed, messages);
    if (!reply) reply = smartRespond(trimmed);

    setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    setLoading(false);

    // Read out the reply if voice enabled
    if (!voiceMuted) {
      setSpeaking(true);
      speak(reply, undefined, () => setSpeaking(false));
    }
  }, [input, loading, messages, voiceMuted]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const toggleVoice = () => {
    if (!voiceMuted) stopSpeech();
    setVoiceMuted(v => !v);
    setSpeaking(false);
  };

  // ─── Render ───────────────────────────────────────────────
  return (
    <>
      {/* ── Section Hover Tooltip ─────────────────────────────────── */}
      <AnimatePresence>
        {tooltipVisible && hoveredSection && (
          <motion.div
            className="ai-hover-tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          >
            <div className="tooltip-header">
              <span className="tooltip-emoji">{hoveredSection.emoji}</span>
              <span className="tooltip-title">{hoveredSection.title}</span>
              <span className="tooltip-badge">AI Guide</span>
            </div>
            <p className="tooltip-tagline">✨ I can explain this section for you</p>
            <div className="tooltip-actions">
              <button
                className={`tooltip-btn speak ${tooltipSpeaking ? 'active' : ''}`}
                onClick={handleTooltipSpeak}
                title={tooltipSpeaking ? 'Stop speaking' : 'Read aloud'}
              >
                {tooltipSpeaking
                  ? <><VolumeX size={13} /> Stop</>
                  : <><Volume2 size={13} /> Speak</>
                }
              </button>
              <button
                className="tooltip-btn ask"
                onClick={handleTooltipAsk}
                title="Get quick summary in chat"
              >
                <MessageCircle size={13} /> Quick Summary
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Chat Button ──────────────────────────────────── */}
      <div className="chat-fab-wrapper">
        <AnimatePresence>
          {!chatOpen && (
            <motion.div
              className="chat-fab-label"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              Ask me anything!
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className={`chat-fab ${chatOpen ? 'open' : ''}`}
          onClick={() => setChatOpen(o => !o)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Toggle AI assistant"
        >
          <AnimatePresence mode="wait">
            {chatOpen
              ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.span>
              : <motion.span key="open"  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Sparkles size={22} /></motion.span>
            }
          </AnimatePresence>
          {/* Pulse rings */}
          {!chatOpen && (
            <>
              <span className="fab-ring ring-1" />
              <span className="fab-ring ring-2" />
            </>
          )}
        </motion.button>
      </div>

      {/* ── Chat Panel ───────────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="chat-panel glass-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            {/* Panel header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="chat-name">Manish's AI Guide</div>
                  <div className="chat-status">
                    <span className="status-dot" />
                    {speaking ? 'Speaking…' : loading ? 'Thinking…' : 'Online'}
                  </div>
                </div>
              </div>
              <div className="chat-header-actions">
                <button
                  className={`chat-icon-btn ${voiceMuted ? 'muted' : ''}`}
                  onClick={toggleVoice}
                  title={voiceMuted ? 'Unmute voice' : 'Mute voice'}
                >
                  {voiceMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <button className="chat-icon-btn" onClick={() => setChatOpen(false)} title="Close">
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="quick-prompts">
              {['His biggest impact?', 'Current role?', 'What\'s his stack?', 'Open to work?'].map(q => (
                <button key={q} className="quick-chip" onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chat-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.role === 'assistant' && (
                    <div className="msg-avatar"><Sparkles size={11} /></div>
                  )}
                  <div className="msg-bubble">{msg.text}</div>
                </motion.div>
              ))}

              {loading && (
                <motion.div className="chat-msg assistant" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="msg-avatar"><Sparkles size={11} /></div>
                  <div className="msg-bubble typing">
                    <span /><span /><span />
                  </div>
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
                placeholder="Ask about Manish…"
                disabled={loading}
              />
              <button
                className="chat-send-btn"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send"
              >
                {loading ? <Loader size={16} className="spin" /> : <Send size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;

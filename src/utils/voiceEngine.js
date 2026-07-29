/**
 * Voice Engine — 4-Provider Text-to-Speech Cascade
 *
 * Priority (best quality → free fallback):
 *
 *  1. ElevenLabs         (VITE_ELEVENLABS_API_KEY) — studio-quality, Indian English voices
 *  2. Sarvam AI          (VITE_SARVAM_API_KEY)     — India-native neural, 11 languages + en-IN
 *  3. Edge TTS           (@andresaya/edge-tts)      — Microsoft Neural FREE, no API key needed
 *                          → en-IN-NeerjaNeural (female) / en-IN-PrabhatNeural (male)
 *                          → Same voice engine as Azure Cognitive Services TTS
 *  4. Web Speech API     (browser built-in)         — free fallback, prefers Microsoft Neural
 *                          → Uses en-IN-NeerjaNeural / en-IN-PrabhatNeural if browser supports them
 *
 * GitHub source for Edge TTS: https://github.com/andresayac/edge-tts
 */

import { EdgeTTS } from '@andresaya/edge-tts';

// ─── Audio Player Singleton ───────────────────────────────────
let activeAudio = null;

const stopActiveAudio = () => {
  if (activeAudio) {
    try { activeAudio.pause(); } catch {}
    try { if (activeAudio._objectUrl) URL.revokeObjectURL(activeAudio._objectUrl); } catch {}
    activeAudio = null;
  }
};

const playUint8Array = (data, mime, onEnd) => {
  stopActiveAudio();
  const blob = new Blob([data], { type: mime });
  const url  = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio._objectUrl = url;
  audio.onended  = () => { try { URL.revokeObjectURL(url); } catch {} onEnd?.(); };
  audio.onerror  = () => { try { URL.revokeObjectURL(url); } catch {} onEnd?.(); };
  audio.play().catch(() => onEnd?.());
  activeAudio = audio;
  return audio;
};

const playBase64 = (b64, mime, onEnd) => {
  const binary = atob(b64);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return playUint8Array(bytes, mime, onEnd);
};

// ─── Provider 1: ElevenLabs ───────────────────────────────────
export const ELEVENLABS_VOICES = {
  meera:  'TxGEqnHWrfWFTfGW9XjX', // Warm Indian female (Multilingual v2)
  riya:   'jsCqWAovK2LkecY7zXl4', // Conversational Indian female
  rachel: '21m00Tcm4TlvDq8ikWAM', // Clear neutral fallback
};

export const speakElevenLabs = async (text, { voiceId, onStart, onEnd } = {}) => {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  if (!apiKey) return false;
  onStart?.();
  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || ELEVENLABS_VOICES.meera}`,
      {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.82, style: 0.06, use_speaker_boost: true },
        }),
      }
    );
    if (!res.ok) return false;
    const bytes = new Uint8Array(await res.arrayBuffer());
    playUint8Array(bytes, 'audio/mpeg', onEnd);
    return true;
  } catch (e) { console.warn('[ElevenLabs]', e); return false; }
};

// ─── Provider 2: Sarvam AI ────────────────────────────────────
// Best compatible Indian English speakers for bulbul:v3: ritu, priya, neha, rahul, pooja, rohan
export const speakSarvam = async (text, { speaker = 'ritu', onStart, onEnd } = {}) => {
  const apiKey = import.meta.env.VITE_SARVAM_API_KEY;
  if (!apiKey) return false;
  onStart?.();
  try {
    const res = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: { 'api-subscription-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: [text.slice(0, 500)],
        target_language_code: 'en-IN',
        speaker,
        pitch: 0,
        pace: 1.05,
        loudness: 1.5,
        speech_sample_rate: 22050,
        enable_preprocessing: true,
        model: 'bulbul:v3',
      }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (!data?.audios?.[0]) return false;
    playBase64(data.audios[0], 'audio/wav', onEnd);
    return true;
  } catch (e) { console.warn('[Sarvam]', e); return false; }
};

// ─── Provider 3: Edge TTS (Microsoft Neural — FREE, no key) ──
// Source: github.com/andresayac/edge-tts
// Voices (Indian English): en-IN-NeerjaNeural (F), en-IN-PrabhatNeural (M)
// Note: Works reliably in Edge/Chromium; may have CORS issues in Firefox

export const EDGE_TTS_VOICES = {
  female: 'en-IN-NeerjaNeural',   // Professional Indian female — best for portfolio
  male:   'en-IN-PrabhatNeural',  // Clear Indian male
  // Fallback English voices if en-IN not available:
  fallback_f: 'en-US-AriaNeural',
  fallback_m: 'en-US-GuyNeural',
};

export const speakEdgeTTS = async (text, { voice, onStart, onEnd } = {}) => {
  try {
    const tts       = new EdgeTTS();
    const voiceName = voice || EDGE_TTS_VOICES.female;

    onStart?.();

    // Collect streaming chunks
    const chunks = [];
    for await (const chunk of tts.synthesizeStream(text, voiceName, {
      rate:   '-5%',   // Slightly slower for clarity
      pitch:  '+0Hz',
      volume: '90%',
    })) {
      chunks.push(chunk);
    }

    if (!chunks.length) return false;

    // Merge chunks
    const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
    const merged   = new Uint8Array(totalLen);
    let offset     = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.length;
    }

    playUint8Array(merged, 'audio/mp3', onEnd);
    return true;
  } catch (e) {
    console.warn('[EdgeTTS]', e);
    return false;
  }
};

// ─── Provider 4: Web Speech API ───────────────────────────────
// 12-tier voice picker: prefers Microsoft Neural Indian English voices
const VOICE_MATCHERS = [
  // Tier 1: Microsoft Online Neural Indian English (Edge/Windows — best free voices)
  v => v.name === 'Microsoft Neerja Online (Natural) - English (India)',
  v => v.name === 'Microsoft Prabhat Online (Natural) - English (India)',
  v => v.name.includes('Neerja')  && v.lang.startsWith('en'),
  v => v.name.includes('Prabhat') && v.lang.startsWith('en'),
  v => v.name.includes('Microsoft') && v.name.includes('Online') && v.lang === 'en-IN',
  // Tier 2: Any Microsoft Online Neural US English
  v => v.name.includes('Microsoft') && v.name.includes('Online') && v.lang.startsWith('en-US'),
  v => v.name.includes('Aria')  && v.lang.startsWith('en'),
  v => v.name.includes('Jenny') && v.lang.startsWith('en'),
  v => v.name.includes('Guy')   && v.lang.startsWith('en'),
  // Tier 3: Google voices
  v => v.name.toLowerCase().includes('google') && v.lang === 'en-IN',
  v => v.name.toLowerCase().includes('google') && v.lang.startsWith('en'),
  // Tier 4: Any Microsoft en-IN or en-US
  v => v.name.includes('Microsoft') && v.lang === 'en-IN',
  v => v.lang === 'en-IN',
  v => v.name.includes('Microsoft') && v.lang.startsWith('en-US'),
  v => v.lang.startsWith('en'),
];

const pickBestVoice = (voices) => {
  for (const matcher of VOICE_MATCHERS) {
    const found = voices.find(matcher);
    if (found) return found;
  }
  return voices[0] ?? null;
};

let utterance = null;

export const speakWebSpeech = (text, { onStart, onEnd } = {}) => {
  if (!window.speechSynthesis) return false;
  window.speechSynthesis.cancel();

  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang   = 'en-IN';
  utterance.rate   = 0.92;
  utterance.pitch  = 1.0;
  utterance.volume = 1;

  const applyVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const best   = pickBestVoice(voices);
    if (best) {
      utterance.voice = best;
      // Neural Online voices sound better at slightly lower rate
      if (best.name.includes('Online') || best.name.includes('Neural')) {
        utterance.rate = 0.88;
      }
    }
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    applyVoice();
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', applyVoice, { once: true });
  }

  utterance.onstart = () => onStart?.();
  utterance.onend   = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
  return true;
};

// ─── Stop All ─────────────────────────────────────────────────
export const stopVoice = () => {
  try { window.speechSynthesis?.cancel(); } catch {}
  stopActiveAudio();
};

// ─── Unified speak() — cascades through all providers ────────
export const speak = async (text, callbacks = {}) => {
  if (!text?.trim()) return 'noop';
  const { onStart, onEnd } = callbacks;

  // 1. Sarvam AI (Indian Native Voice) — Default Everywhere
  if (import.meta.env.VITE_SARVAM_API_KEY) {
    const ok = await speakSarvam(text, { onStart, onEnd });
    if (ok) return 'sarvam';
  }

  // 2. Edge TTS (Microsoft Neural) — Fallback
  const edgeOk = await speakEdgeTTS(text, { onStart, onEnd });
  if (edgeOk) return 'edge-tts';

  // 3. ElevenLabs (Fallback)
  if (import.meta.env.VITE_ELEVENLABS_API_KEY) {
    const ok = await speakElevenLabs(text, { onStart, onEnd });
    if (ok) return 'elevenlabs';
  }

  // 4. Web Speech API (Browser local fallback)
  speakWebSpeech(text, { onStart, onEnd });
  return 'webspeech';
};

// ─── Provider label for UI ────────────────────────────────────
export const getVoiceProvider = () => {
  if (import.meta.env.VITE_SARVAM_API_KEY) return '🇮🇳 Sarvam AI';
  return '🔊 Microsoft Neural (Free)';
};


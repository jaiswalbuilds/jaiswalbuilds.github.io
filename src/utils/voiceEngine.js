/**
 * Voice Engine — Multi-Provider Text-to-Speech
 *
 * Priority order:
 *  1. ElevenLabs  (VITE_ELEVENLABS_API_KEY)  — best quality, Indian English voices
 *  2. Sarvam AI   (VITE_SARVAM_API_KEY)       — India-native, 11 Indian languages + en-IN
 *  3. Web Speech API                           — free fallback (browser built-in)
 */

// ─── Audio Player ─────────────────────────────────────────────
let activeAudio = null;

const playBlob = (blob, onEnd) => {
  const url = URL.createObjectURL(blob);
  if (activeAudio) { activeAudio.pause(); URL.revokeObjectURL(activeAudio.src); }
  activeAudio = new Audio(url);
  activeAudio.onended = () => { URL.revokeObjectURL(url); onEnd?.(); };
  activeAudio.onerror = () => { URL.revokeObjectURL(url); onEnd?.(); };
  activeAudio.play().catch(onEnd);
  return activeAudio;
};

const playBase64Wav = (b64, onEnd) => {
  const binary = atob(b64);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: 'audio/wav' });
  return playBlob(blob, onEnd);
};

// ─── ElevenLabs ───────────────────────────────────────────────
// Indian English voices (from ElevenLabs voice library research):
// - Mahi     : warm female, great for conversational portfolio guide
// - Saavi    : professional female, firm and polite
// Default to a known-stable multilingual voice if custom IDs not available.
export const ELEVENLABS_VOICES = {
  mahi:  'jsCqWAovK2LkecY7zXl4', // Warm Indian female
  saavi: 'zcAOhNBS3c14rBihAFp1', // Professional Indian female  
  rachel: '21m00Tcm4TlvDq8ikWAM',// Rachel — clear natural fallback
};

export const speakElevenLabs = async (text, { voiceId, onStart, onEnd } = {}) => {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  if (!apiKey) return false;

  const vid = voiceId || ELEVENLABS_VOICES.mahi;
  onStart?.();
  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${vid}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.52, similarity_boost: 0.80, style: 0.08, use_speaker_boost: true },
        }),
      }
    );
    if (!res.ok) return false;
    const blob = await res.blob();
    playBlob(blob, onEnd);
    return true;
  } catch {
    return false;
  }
};

// ─── Sarvam AI (India-native TTS) ────────────────────────────
// 11 Indian languages + Indian English, 35+ voices
// Speakers: meera (F), pavithra (F), maitreyi (F), arvind (M), amol (M), amartya (M)
export const speakSarvam = async (text, { speaker = 'meera', onStart, onEnd } = {}) => {
  const apiKey = import.meta.env.VITE_SARVAM_API_KEY;
  if (!apiKey) return false;

  onStart?.();
  try {
    const res = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'api-subscription-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: [text.slice(0, 500)], // Sarvam limit per call
        target_language_code: 'en-IN',
        speaker,
        pitch: 0,
        pace: 1.05,
        loudness: 1.4,
        speech_sample_rate: 22050,
        enable_preprocessing: true,
        model: 'bulbul:v1',
      }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (!data?.audios?.[0]) return false;
    playBase64Wav(data.audios[0], onEnd);
    return true;
  } catch {
    return false;
  }
};

// ─── Web Speech API (built-in fallback) ──────────────────────
let utterance = null;

export const speakWebSpeech = (text, { onStart, onEnd } = {}) => {
  if (!window.speechSynthesis) return false;
  window.speechSynthesis.cancel();

  utterance = new SpeechSynthesisUtterance(text);
  utterance.rate  = 0.92;
  utterance.pitch = 1.05;
  utterance.volume = 1;
  utterance.lang  = 'en-IN';

  // Prefer Indian English or Google neural voice
  const loadVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const pick =
      voices.find(v => v.lang === 'en-IN')
      || voices.find(v => v.name.toLowerCase().includes('india'))
      || voices.find(v => v.name.toLowerCase().includes('google') && v.lang.startsWith('en'))
      || voices[0];
    if (pick) utterance.voice = pick;
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    loadVoice();
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', loadVoice, { once: true });
  }

  utterance.onstart = () => onStart?.();
  utterance.onend   = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
  return true;
};

// ─── Stop All ─────────────────────────────────────────────────
export const stopVoice = () => {
  window.speechSynthesis?.cancel();
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
};

// ─── Unified speak() — tries providers in priority order ─────
export const speak = async (text, callbacks = {}) => {
  const { onStart, onEnd } = callbacks;
  // Try ElevenLabs first
  if (import.meta.env.VITE_ELEVENLABS_API_KEY) {
    const ok = await speakElevenLabs(text, { onStart, onEnd });
    if (ok) return 'elevenlabs';
  }
  // Try Sarvam AI second
  if (import.meta.env.VITE_SARVAM_API_KEY) {
    const ok = await speakSarvam(text, { onStart, onEnd });
    if (ok) return 'sarvam';
  }
  // Web Speech API fallback
  speakWebSpeech(text, { onStart, onEnd });
  return 'webspeech';
};

export const getVoiceProvider = () => {
  if (import.meta.env.VITE_ELEVENLABS_API_KEY) return 'ElevenLabs';
  if (import.meta.env.VITE_SARVAM_API_KEY)    return 'Sarvam AI';
  return 'Browser (Web Speech)';
};

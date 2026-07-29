/**
 * Agent Actions — Intent Detection + Action Handlers
 *
 * When the AI detects an intent (email, schedule call, etc.)
 * it returns an ActionCard rendered inside the chat.
 */
import emailjs from '@emailjs/browser';

// ─── Contact Details (customise these) ───────────────────────
export const CONTACT = {
  email: 'jaiswalmanish060@gmail.com',
  phone: '+918015973380',
  linkedin: 'https://www.linkedin.com/in/manish-kumar-74ab6210a/',
  github: 'https://github.com/jaiswalwrites',
  discord: 'manishjaiswal9689',
  website: 'https://jaiswalbuilds.github.io/',
  calendly: 'https://calendly.com/jaiswalmanish060/book-a-call-with-manish',
  resume: 'https://drive.google.com/file/d/1I5X8MmdWmbdW7c6QikuV-0RwRc0JrG-A/view?usp=sharing',
};

// ─── EmailJS Config (set in .env) ────────────────────────────
const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';
const HAS_EMAILJS = !!(EJ_SERVICE && EJ_TEMPLATE && EJ_KEY);

// ─── Intent Map ──────────────────────────────────────────────
const INTENTS = [
  {
    id: 'send_email',
    triggers: ['email', 'mail', 'message', 'contact', 'write to', 'reach out', 'get in touch', 'send'],
    priority: 1,
  },
  {
    id: 'schedule_call',
    triggers: ['call', 'meeting', 'schedule', 'book', 'talk', 'calendar', 'catch up', 'video', 'zoom', 'meet', 'phone'],
    priority: 1,
  },
  {
    id: 'view_resume',
    triggers: ['resume', 'cv', 'download', 'pdf'],
    priority: 1,
  },
  {
    id: 'linkedin',
    triggers: ['linkedin', 'connect', 'profile', 'social', 'network'],
    priority: 2,
  },
  {
    id: 'github',
    triggers: ['github', 'code', 'repository', 'source', 'projects', 'repo'],
    priority: 2,
  },
  {
    id: 'discord',
    triggers: ['discord', 'dm', 'chat'],
    priority: 2,
  },
];

// ─── Detect Intent ────────────────────────────────────────────
export const detectIntent = (text) => {
  const lower = text.toLowerCase();
  let best = null;
  for (const intent of INTENTS) {
    if (intent.triggers.some(t => lower.includes(t))) {
      if (!best || intent.priority < best.priority) best = intent;
    }
  }
  return best?.id || null;
};

export const ACTION_RESPONSES = {
  send_email: {
    text: `I'll open a contact form right now. Fill in your details and I'll send your message directly to Manish at jaiswalmanish060@gmail.com. 📧`,
    action: 'email_form',
  },
  schedule_call: {
    text: `Let's get a call booked! Pick a time directly from Manish's calendar — no back-and-forth. 📅`,
    action: 'schedule_card',
  },
  view_resume: {
    text: `Here's Manish's resume — you can view or download it directly. 📄`,
    action: 'resume_card',
  },
  linkedin: {
    text: `Here's Manish's LinkedIn — the best place to connect professionally. 🔗`,
    action: 'linkedin_card',
  },
  github: {
    text: `Here's Manish's GitHub (jaiswalwrites) — all his code, projects, and contributions. 👨‍💻`,
    action: 'github_card',
  },
  discord: {
    text: `Manish's Discord handle is manishjaiswal9689 — feel free to reach out there too. 💬`,
    action: 'discord_card',
  },
};

// ─── EmailJS Send ─────────────────────────────────────────────
export const sendEmail = async ({ name, email, message }) => {
  if (HAS_EMAILJS) {
    try {
      await emailjs.send(
        EJ_SERVICE,
        EJ_TEMPLATE,
        { from_name: name, from_email: email, message, to_email: CONTACT.email },
        EJ_KEY
      );
      return { ok: true, method: 'emailjs' };
    } catch (err) {
      console.error('EmailJS error:', err);
    }
  }
  // Fallback: open mailto link
  const subject = encodeURIComponent(`Portfolio Enquiry from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.open(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`, '_blank');
  return { ok: true, method: 'mailto' };
};

// ─── Other Actions ────────────────────────────────────────────
export const openSchedule = () => window.open(CONTACT.calendly, '_blank');
export const openLinkedIn = () => window.open(CONTACT.linkedin, '_blank');
export const openGitHub   = () => window.open(CONTACT.github,   '_blank');
export const openResume   = () => window.open(CONTACT.resume,   '_blank');
export const copyDiscord  = () => { navigator.clipboard?.writeText(CONTACT.discord); };

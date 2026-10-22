export const COLORS = {
  surface: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  muted: '#6B7280',
  
  mutedStrong: '#4B5563',
  accent: '#2563EB',
  
  like: '#BE123C',
  heroPlaceholder: '#DDDDDD',
  moodPlaceholder: '#EEF2FF',
};

export const SPACE = { xs: 4, s: 8, m: 12, l: 16, xl: 24 };
export const RADIUS = { card: 12, avatar: 32, badge: 10 };
export const TYPO = { h1: 24, title: 16, body: 14, caption: 12 };


export const BREAKPOINTS = { tablet: 600 };
export const MOOD_THEME = {
  happy: {
    label: 'Senang',
    border: '#F59E0B',
    background: '#FFFBEB',
    badge: '#B45309',
    badgeText: '#FFFFFF',
  },
  focus: {
    label: 'Fokus',
    border: '#2563EB',
    background: '#EFF6FF',
    badge: '#1D4ED8',
    badgeText: '#FFFFFF',
  },
  calm: {
    label: 'Tenang',
    border: '#0D9488',
    background: '#ECFDF5',
    badge: '#0F766E',
    badgeText: '#FFFFFF',
  },
  hangout: {
    label: 'Santai',
    border: '#DB2777',
    background: '#FDF2F8',
    badge: '#BE185D',
    badgeText: '#FFFFFF',
  },
  evening: {
    label: 'Senja',
    border: '#7C3AED',
    background: '#F5F3FF',
    badge: '#6D28D9',
    badgeText: '#FFFFFF',
  },
  default: {
    label: 'Netral',
    border: '#6B7280',
    background: '#FFFFFF',
    badge: '#4B5563',
    badgeText: '#FFFFFF',
  },
};

export const getMoodTheme = (mood) => MOOD_THEME[mood] ?? MOOD_THEME.default;

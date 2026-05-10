// ─── Date Utilities ───────────────────────────────────────────────────────────

export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// ─── Streak Calculator ────────────────────────────────────────────────────────

export function calculateStreak(completedDates = []) {
  if (!completedDates.length) return { current: 0, best: 0 };
  const sorted = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));
  const today = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let current = 0;
  const startFrom = sorted[0] === today || sorted[0] === yesterdayStr ? sorted[0] : null;
  if (startFrom) {
    let checkDate = new Date(startFrom + 'T00:00:00');
    for (let i = 0; i < sorted.length; i++) {
      const expected = checkDate.toISOString().split('T')[0];
      if (sorted[i] === expected) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate best streak
  let best = 0, run = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const d1 = new Date(sorted[i] + 'T00:00:00');
    const d2 = new Date(sorted[i + 1] + 'T00:00:00');
    const diff = (d1 - d2) / (1000 * 60 * 60 * 24);
    if (diff === 1) { run++; best = Math.max(best, run); }
    else { best = Math.max(best, run); run = 1; }
  }
  best = Math.max(best, run, current);
  return { current, best };
}

// ─── Completion Helpers ───────────────────────────────────────────────────────

export function isCompletedToday(habit) {
  return habit.completedDates?.includes(todayStr()) ?? false;
}

export function getCompletionRate(completedDates = [], days = 30) {
  const today = new Date();
  let count = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (completedDates.includes(d.toISOString().split('T')[0])) count++;
  }
  return Math.round((count / days) * 100);
}

// ─── Achievement Definitions ──────────────────────────────────────────────────

export const ACHIEVEMENTS = [
  { id: 'first_habit',   icon: '🌱', title: 'First Step',   desc: 'Created your first habit',   check: (habits) => habits.length >= 1 },
  { id: 'streak_7',      icon: '🔥', title: 'On Fire',       desc: '7-day streak on any habit',   check: (habits) => habits.some(h => calculateStreak(h.completedDates).current >= 7) },
  { id: 'streak_30',     icon: '💎', title: 'Diamond Mind',  desc: '30-day streak on any habit',  check: (habits) => habits.some(h => calculateStreak(h.completedDates).current >= 30) },
  { id: 'five_habits',   icon: '⚡', title: 'Power User',    desc: 'Managing 5+ habits',          check: (habits) => habits.length >= 5 },
  { id: 'perfect_day',   icon: '✨', title: 'Perfect Day',   desc: 'Completed all habits today',  check: (habits) => habits.length > 0 && habits.every(h => isCompletedToday(h)) },
  { id: 'century',       icon: '💯', title: 'Century Club',  desc: '100 total completions',       check: (habits) => habits.reduce((s, h) => s + (h.completedDates?.length || 0), 0) >= 100 },
];

// ─── Quotes ───────────────────────────────────────────────────────────────────

export const QUOTES = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "Chains of habit are too light to be felt until they are too heavy to be broken.", author: "Warren Buffett" },
  { text: "First forget inspiration. Habit is more dependable.", author: "Octavia Butler" },
  { text: "The difference between who you are and who you want to be is what you do.", author: "Unknown" },
  { text: "Long-term consistency beats short-term intensity.", author: "Bruce Lee" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
];

export function getDailyQuote() {
  const idx = new Date().getDate() % QUOTES.length;
  return QUOTES[idx];
}

// ─── ID Generator ─────────────────────────────────────────────────────────────

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ─── Local Storage ────────────────────────────────────────────────────────────

export function loadHabits() {
  try {
    const raw = localStorage.getItem('hf_habits');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveHabits(habits) {
  try { localStorage.setItem('hf_habits', JSON.stringify(habits)); } catch {}
}

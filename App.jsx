import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import Achievements from './components/Achievements';
import HabitForm from './components/HabitForm';
import { loadHabits, saveHabits, generateId, todayStr, isCompletedToday } from './utils/helpers';

export default function App() {
  const [habits, setHabits] = useState(() => loadHabits());
  const [view, setView] = useState('dashboard');
  const [form, setForm] = useState(null); // null | 'add' | habitObj (for edit)
  const [darkMode, setDarkMode] = useState(true); // always dark by default

  // Persist habits
  useEffect(() => { saveHabits(habits); }, [habits]);

  // Toggle dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleToggle = useCallback((id) => {
    const today = todayStr();
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const dates = h.completedDates || [];
      const done = dates.includes(today);
      return {
        ...h,
        completedDates: done ? dates.filter(d => d !== today) : [...dates, today],
      };
    }));
  }, []);

  const handleAdd = useCallback(() => setForm('add'), []);

  const handleEdit = useCallback((habit) => setForm(habit), []);

  const handleDelete = useCallback((id) => {
    if (confirm('Delete this habit? All progress will be lost.')) {
      setHabits(prev => prev.filter(h => h.id !== id));
    }
  }, []);

  const handleSave = useCallback(({ name, emoji, description }) => {
    if (form === 'add') {
      const newHabit = {
        id: generateId(),
        name,
        emoji,
        description,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      setHabits(prev => [newHabit, ...prev]);
    } else {
      setHabits(prev => prev.map(h =>
        h.id === form.id ? { ...h, name, emoji, description } : h
      ));
    }
  }, [form]);

  const handleClose = useCallback(() => setForm(null), []);

  // ─── View Render ──────────────────────────────────────────────────────────

  const viewContent = {
    dashboard: <Dashboard habits={habits} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />,
    analytics: <Analytics habits={habits} />,
    calendar: <Calendar habits={habits} />,
    achievements: <Achievements habits={habits} />,
  };

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar view={view} setView={setView} darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {viewContent[view]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div className="text-center pb-8 text-muted font-mono text-xs">
        HabitFlow — Built by Muhammad Haseeb ⚡
      </div>

      {/* Modal */}
      <AnimatePresence>
        {form && (
          <HabitForm
            habit={form === 'add' ? null : form}
            onSave={handleSave}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

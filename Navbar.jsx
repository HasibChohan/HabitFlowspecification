import { motion } from 'framer-motion';
import { Zap, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ view, setView, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'achievements', label: 'Achievements' },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-grad-accent flex items-center justify-center glow-accent">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Habit<span className="text-gradient">Flow</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-4 py-2 rounded-xl font-body font-medium text-sm transition-all duration-200 ${
                  view === item.id
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-white hover:bg-white/8 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-white hover:bg-white/8 transition-all duration-200"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 flex flex-col gap-1"
          >
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setMenuOpen(false); }}
                className={`px-4 py-3 rounded-xl font-body font-medium text-sm text-left transition-all duration-200 ${
                  view === item.id
                    ? 'bg-accent/20 text-accent'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

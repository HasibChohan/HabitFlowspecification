import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';

const EMOJIS = ['💪', '📚', '🏃', '🧘', '💧', '🍎', '😴', '✍️', '🎯', '🧠', '🎨', '🎵', '🌿', '⚡', '🔥', '🌟'];

export default function HabitForm({ habit, onSave, onClose }) {
  const [name, setName] = useState(habit?.name || '');
  const [emoji, setEmoji] = useState(habit?.emoji || '💪');
  const [desc, setDesc] = useState(habit?.description || '');
  const isEdit = !!habit;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), emoji, description: desc.trim() });
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(13,13,26,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="glass rounded-2xl p-6 w-full max-w-md noise-bg"
          style={{ border: '1px solid rgba(108,99,255,0.25)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center">
                {isEdit ? <Pencil size={16} className="text-accent" /> : <Plus size={16} className="text-accent" />}
              </div>
              <div>
                <h2 className="font-display font-bold text-white text-base">
                  {isEdit ? 'Edit Habit' : 'New Habit'}
                </h2>
                <p className="text-muted text-xs font-body">
                  {isEdit ? 'Update your habit details' : 'Start building a new routine'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-white hover:bg-white/8 transition-all"
            >
              <X size={15} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Emoji picker */}
            <div>
              <label className="block text-xs font-display font-semibold text-muted uppercase tracking-widest mb-2">
                Icon
              </label>
              <div className="grid grid-cols-8 gap-1.5">
                {EMOJIS.map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all duration-150 ${
                      emoji === e
                        ? 'bg-accent/30 border border-accent/50 scale-110'
                        : 'bg-white/5 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-display font-semibold text-muted uppercase tracking-widest mb-2">
                Habit Name *
              </label>
              <input
                className="input-field"
                placeholder="e.g. Morning Run, Read 30 mins..."
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
                maxLength={50}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-display font-semibold text-muted uppercase tracking-widest mb-2">
                Description (optional)
              </label>
              <textarea
                className="input-field resize-none"
                rows={2}
                placeholder="Why does this habit matter to you?"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                maxLength={120}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="btn-ghost flex-1">
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isEdit ? 'Save Changes' : 'Add Habit'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

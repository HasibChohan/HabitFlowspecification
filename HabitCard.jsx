import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Pencil, Trash2, Flame, Trophy } from 'lucide-react';
import { calculateStreak, isCompletedToday } from '../utils/helpers';

export default function HabitCard({ habit, index, onToggle, onEdit, onDelete }) {
  const done = isCompletedToday(habit);
  const { current: streak, best } = calculateStreak(habit.completedDates);
  const total = habit.completedDates?.length || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-light rounded-2xl p-5 noise-bg group transition-all duration-300 ${
        done ? 'border-accent/30' : 'border-transparent'
      }`}
      style={{
        border: `1px solid ${done ? 'rgba(108,99,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
        background: done
          ? 'rgba(108,99,255,0.07)'
          : 'rgba(255,255,255,0.03)',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Emoji */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 ${
            done ? 'bg-accent/20 scale-110' : 'bg-white/5'
          }`}
        >
          {habit.emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className={`font-display font-bold text-base leading-tight truncate transition-colors duration-200 ${
                done ? 'text-white' : 'text-white/85'
              }`}>
                {habit.name}
              </h3>
              {habit.description && (
                <p className="text-muted text-xs font-body mt-0.5 line-clamp-1">{habit.description}</p>
              )}
            </div>
            {/* Action buttons */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
              <button
                onClick={() => onEdit(habit)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => onDelete(habit.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 mt-3">
            {/* Streak */}
            <div className={`flex items-center gap-1 ${streak > 0 ? 'text-orange-400' : 'text-muted'}`}>
              <Flame size={13} className={streak > 0 ? 'glow-fire' : ''} />
              <span className="font-mono text-xs font-medium">{streak}d</span>
            </div>
            {/* Best */}
            <div className="flex items-center gap-1 text-muted">
              <Trophy size={12} />
              <span className="font-mono text-xs">Best: {best}</span>
            </div>
            {/* Total */}
            <div className="flex items-center gap-1 text-muted ml-auto">
              <span className="font-mono text-xs">{total} total</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 progress-bar-track">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: done ? '100%' : `${Math.min((streak / 30) * 100, 90)}%` }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>
        </div>

        {/* Toggle button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => onToggle(habit.id)}
          className="flex-shrink-0 transition-all duration-200"
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
        >
          {done
            ? <CheckCircle2 size={26} className="text-accent" style={{ filter: 'drop-shadow(0 0 8px rgba(108,99,255,0.6))' }} />
            : <Circle size={26} className="text-border hover:text-accent/60 transition-colors" />
          }
        </motion.button>
      </div>
    </motion.div>
  );
}

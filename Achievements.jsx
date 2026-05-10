import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '../utils/helpers';

export default function Achievements({ habits }) {
  const unlocked = ACHIEVEMENTS.filter(a => a.check(habits));
  const locked = ACHIEVEMENTS.filter(a => !a.check(habits));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display font-bold text-white text-xl mb-1">Achievements</h2>
        <p className="text-muted font-body text-sm">{unlocked.length} of {ACHIEVEMENTS.length} unlocked</p>
      </div>

      {/* Progress */}
      <div className="glass rounded-2xl p-4 noise-bg" style={{ border: '1px solid rgba(108,99,255,0.15)' }}>
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="text-muted">Progress</span>
          <span className="text-accent">{unlocked.length}/{ACHIEVEMENTS.length}</span>
        </div>
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div>
          <h3 className="font-display font-semibold text-white/70 text-sm uppercase tracking-widest mb-3">Unlocked</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlocked.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 400, damping: 25 }}
                className="glass-light rounded-2xl p-4 noise-bg flex items-center gap-4"
                style={{ border: '1px solid rgba(108,99,255,0.25)', background: 'rgba(108,99,255,0.07)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(108,99,255,0.3)' }}>
                  {a.icon}
                </div>
                <div>
                  <p className="font-display font-bold text-white text-sm">{a.title}</p>
                  <p className="text-muted text-xs font-body mt-0.5">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h3 className="font-display font-semibold text-white/30 text-sm uppercase tracking-widest mb-3">Locked</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locked.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-4 flex items-center gap-4"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Lock size={18} className="text-border" />
                </div>
                <div>
                  <p className="font-display font-bold text-white/30 text-sm">{a.title}</p>
                  <p className="text-white/25 text-xs font-body mt-0.5">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {unlocked.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="font-display font-bold text-white text-base mb-2">No Achievements Yet</h3>
          <p className="text-muted font-body text-sm">Start tracking habits to earn your first achievement!</p>
        </div>
      )}
    </motion.div>
  );
}

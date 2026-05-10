import { motion } from 'framer-motion';
import { getCompletionRate, calculateStreak, todayStr } from '../utils/helpers';

function MiniBar({ value, max, color = '#6C63FF' }) {
  return (
    <div className="w-full bg-border rounded-full overflow-hidden" style={{ height: 6 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((value / (max || 1)) * 100, 100)}%` }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ height: '100%', background: color, borderRadius: 9999 }}
      />
    </div>
  );
}

function WeekChart({ habit }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const str = d.toISOString().split('T')[0];
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' })[0],
      done: habit.completedDates?.includes(str) ?? false,
      isToday: str === todayStr(),
    };
  });

  return (
    <div className="flex items-end gap-1.5">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: 'bottom' }}
            className={`w-full rounded-md transition-all ${
              d.done
                ? 'bg-accent'
                : d.isToday
                ? 'bg-accent/20 border border-accent/30'
                : 'bg-border'
            }`}
            style={{ height: 32, transformOrigin: 'bottom' }}
          />
          <span className={`text-xs font-mono ${d.isToday ? 'text-accent' : 'text-muted'}`}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Analytics({ habits }) {
  if (!habits.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h3 className="font-display font-bold text-white text-lg mb-2">No Data Yet</h3>
        <p className="text-muted font-body text-sm">Add habits and start tracking to see your analytics here.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display font-bold text-white text-xl mb-1">Analytics</h2>
        <p className="text-muted font-body text-sm">Your habit performance at a glance</p>
      </div>

      {/* Per-habit breakdown */}
      <div className="grid gap-4">
        {habits.map((habit, i) => {
          const rate7 = getCompletionRate(habit.completedDates, 7);
          const rate30 = getCompletionRate(habit.completedDates, 30);
          const { current, best } = calculateStreak(habit.completedDates);
          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="glass-light rounded-2xl p-5 noise-bg"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{habit.emoji}</span>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">{habit.name}</h3>
                  <p className="text-muted text-xs font-mono">{habit.completedDates?.length || 0} total check-ins</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-mono font-bold text-accent text-lg">{rate30}%</p>
                  <p className="text-muted text-xs">30-day rate</p>
                </div>
              </div>

              {/* Week chart */}
              <div className="mb-4">
                <p className="text-muted text-xs font-display font-semibold uppercase tracking-widest mb-2">Last 7 Days</p>
                <WeekChart habit={habit} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '7-Day Rate', value: `${rate7}%`, color: '#6C63FF' },
                  { label: 'Current Streak', value: `${current}d 🔥`, color: '#f7971e' },
                  { label: 'Best Streak', value: `${best}d 🏆`, color: '#FBBF24' },
                ].map(s => (
                  <div key={s.label} className="bg-white/3 rounded-xl p-3 text-center">
                    <p className="font-mono font-bold text-white text-sm">{s.value}</p>
                    <p className="text-muted text-xs font-body mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

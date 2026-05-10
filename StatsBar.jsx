import { motion } from 'framer-motion';
import { Flame, CheckCheck, Trophy, TrendingUp } from 'lucide-react';
import { isCompletedToday, calculateStreak } from '../utils/helpers';

export default function StatsBar({ habits }) {
  const total = habits.length;
  const doneToday = habits.filter(isCompletedToday).length;
  const todayPct = total ? Math.round((doneToday / total) * 100) : 0;
  const longestStreak = habits.reduce((max, h) => {
    const { current } = calculateStreak(h.completedDates);
    return Math.max(max, current);
  }, 0);
  const totalCompletions = habits.reduce((s, h) => s + (h.completedDates?.length || 0), 0);

  const stats = [
    {
      icon: <CheckCheck size={18} />,
      label: "Today's Progress",
      value: `${doneToday}/${total}`,
      sub: `${todayPct}% complete`,
      color: 'text-accent',
      bg: 'bg-accent/10',
      glow: 'rgba(108,99,255,0.2)',
    },
    {
      icon: <Flame size={18} />,
      label: 'Best Streak',
      value: `${longestStreak}`,
      sub: 'consecutive days',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      glow: 'rgba(247,151,30,0.2)',
    },
    {
      icon: <Trophy size={18} />,
      label: 'Total Habits',
      value: `${total}`,
      sub: 'being tracked',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      glow: 'rgba(234,179,8,0.2)',
    },
    {
      icon: <TrendingUp size={18} />,
      label: 'All-Time Completions',
      value: `${totalCompletions}`,
      sub: 'check-ins logged',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      glow: 'rgba(67,233,123,0.2)',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="stat-card"
          style={{ boxShadow: `0 4px 24px ${s.glow}` }}
        >
          <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center ${s.color} mb-3`}>
            {s.icon}
          </div>
          <p className="font-display font-bold text-2xl text-white leading-none">{s.value}</p>
          <p className="text-muted text-xs font-body mt-1.5">{s.sub}</p>
          <p className={`text-xs font-display font-semibold mt-0.5 ${s.color}`}>{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

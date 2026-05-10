import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/helpers';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Calendar({ habits }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date().toISOString().split('T')[0];

  // Build a completion map per day
  function getDayStatus(day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (!habits.length) return 'empty';
    const done = habits.filter(h => h.completedDates?.includes(dateStr)).length;
    if (done === 0) return 'none';
    if (done === habits.length) return 'full';
    return 'partial';
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display font-bold text-white text-xl mb-1">Calendar</h2>
        <p className="text-muted font-body text-sm">Your habit completion history</p>
      </div>

      <div className="glass rounded-2xl p-5 noise-bg" style={{ border: '1px solid rgba(108,99,255,0.15)' }}>
        {/* Month nav */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-white hover:bg-white/8 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <h3 className="font-display font-bold text-white text-base">
            {MONTHS[month]} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-white hover:bg-white/8 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-xs font-display font-semibold text-muted uppercase tracking-widest py-1">
              {d[0]}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === today;
            const status = getDayStatus(day);

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.008, duration: 0.25 }}
                className={`aspect-square rounded-lg flex items-center justify-center relative transition-all duration-200 ${
                  isToday ? 'ring-2 ring-accent ring-offset-1 ring-offset-ink' : ''
                } ${
                  status === 'full'
                    ? 'bg-accent'
                    : status === 'partial'
                    ? 'bg-accent/35'
                    : status === 'none'
                    ? 'bg-white/5'
                    : 'bg-transparent'
                }`}
              >
                <span className={`font-mono text-xs ${
                  status === 'full' ? 'text-white font-bold' :
                  isToday ? 'text-accent font-bold' :
                  'text-muted'
                }`}>
                  {day}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border">
          {[
            { color: 'bg-accent', label: 'All complete' },
            { color: 'bg-accent/35', label: 'Partial' },
            { color: 'bg-white/5', label: 'None' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${l.color}`} />
              <span className="text-muted text-xs font-body">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

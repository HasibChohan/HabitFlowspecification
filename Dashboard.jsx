import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import HabitCard from './HabitCard';
import StatsBar from './StatsBar';
import QuoteCard from './QuoteCard';

export default function Dashboard({ habits, onAdd, onEdit, onDelete, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Quote */}
      <QuoteCard />

      {/* Stats */}
      <StatsBar habits={habits} />

      {/* Habit list header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-white text-xl">My Habits</h2>
          <p className="text-muted font-body text-sm mt-0.5">
            {habits.length === 0 ? 'No habits yet — add your first one!' : `${habits.length} habit${habits.length === 1 ? '' : 's'} being tracked`}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onAdd}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">Add Habit</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </div>

      {/* Habits */}
      {habits.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-light rounded-2xl p-10 text-center noise-bg"
          style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
        >
          <div className="text-5xl mb-4 animate-float inline-block">✨</div>
          <h3 className="font-display font-bold text-white text-lg mb-2">Start Your Journey</h3>
          <p className="text-muted font-body text-sm mb-6 max-w-xs mx-auto">
            Every great routine starts with a single habit. Add your first one and begin building the life you want.
          </p>
          <button onClick={onAdd} className="btn-primary inline-flex items-center gap-2">
            <Sparkles size={15} />
            Add Your First Habit
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {habits.map((habit, i) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                index={i}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

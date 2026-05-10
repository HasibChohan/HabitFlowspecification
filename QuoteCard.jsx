import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { QUOTES } from '../utils/helpers';

export default function QuoteCard() {
  const [idx, setIdx] = useState(new Date().getDate() % QUOTES.length);
  const [key, setKey] = useState(0);
  const quote = QUOTES[idx];

  function refresh() {
    setIdx(i => (i + 1) % QUOTES.length);
    setKey(k => k + 1);
  }

  return (
    <div className="glass rounded-2xl p-5 noise-bg relative overflow-hidden" style={{ border: '1px solid rgba(108,99,255,0.15)' }}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6C63FF, transparent)', transform: 'translate(30%, -30%)' }}
      />
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Quote size={14} className="text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/85 font-body text-sm leading-relaxed italic">
                "{quote.text}"
              </p>
              <p className="text-muted font-display font-semibold text-xs mt-1.5">— {quote.author}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={refresh}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all flex-shrink-0"
          title="New quote"
        >
          <RefreshCw size={13} />
        </button>
      </div>
    </div>
  );
}

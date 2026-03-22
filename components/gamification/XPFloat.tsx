'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './XPFloat.module.css';

interface FloatEntry {
  id: number;
  amount: number;
  x: number;
  y: number;
}

let floatId = 0;

export function useXPFloat() {
  const [floats, setFloats] = useState<FloatEntry[]>([]);

  const trigger = useCallback((amount: number, x = 0, y = 0) => {
    const id = ++floatId;
    const offsetX = x || (Math.random() * 40 - 20);
    setFloats(prev => [...prev, { id, amount, x: offsetX, y }]);
  }, []);

  const remove = useCallback((id: number) => {
    setFloats(prev => prev.filter(f => f.id !== id));
  }, []);

  return { floats, trigger, remove };
}

export default function XPFloatProvider({ children, floats, onRemove }: { children: React.ReactNode; floats: FloatEntry[]; onRemove: (id: number) => void }) {
  return (
    <>
      {children}
      <div className={styles.container} aria-live="polite">
        <AnimatePresence>
          {floats.map(f => (
            <motion.div
              key={f.id}
              className={styles.float}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
              animate={{ opacity: [1, 1, 0], y: -70, x: f.x, scale: [1, 1.2, 1.1] }}
              transition={{ duration: 1.4, times: [0, 0.6, 1] }}
              onAnimationComplete={() => onRemove(f.id)}
            >
              +{f.amount} XP
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

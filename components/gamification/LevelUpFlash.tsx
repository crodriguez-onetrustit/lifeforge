'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getLevelTitle } from '@/lib/xp/engine';
import styles from './LevelUpFlash.module.css';

export function useLevelUpFlash() {
  const [flashLevel, setFlashLevel] = useState<number | null>(null);

  const trigger = useCallback((level: number) => {
    setFlashLevel(level);
    setTimeout(() => setFlashLevel(null), 1200);
  }, []);

  return { flashLevel, trigger };
}

export default function LevelUpFlash({ level }: { level: number }) {
  return (
    <AnimatePresence>
      {level && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.75, 0] }}
          transition={{ duration: 0.9, times: [0, 0.3, 1] }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.content}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.04, 1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, times: [0, 0.2, 0.7, 1] }}
          >
            <span className={styles.badge}>⬆ LEVEL UP</span>
            <span className={styles.level}>Level {level}</span>
            <span className={styles.title}>{getLevelTitle(level)}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './PathComplete.module.css';

interface PathCompleteProps {
  curriculumTitle: string;
  onDismiss: () => void;
}

export default function PathComplete({ curriculumTitle, onDismiss }: PathCompleteProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDismiss}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          <motion.div
            className={styles.emoji}
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            🎉
          </motion.div>

          <h2 className={styles.heading}>Path Complete!</h2>
          <p className={styles.title}>{curriculumTitle}</p>

          <div className={styles.reward}>
            <span className={styles.xp}>+200 XP</span>
            <span className={styles.coin}>+20 Coins</span>
          </div>

          <p className={styles.message}>
            You've mastered this path. Choose your next adventure.
          </p>

          <button className={styles.button} onClick={onDismiss}>
            Continue Learning
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

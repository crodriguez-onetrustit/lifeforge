'use client';

import { useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { exportAll, downloadExport } from '@/lib/export/exportAll';
import { importAll } from '@/lib/export/importAll';
import styles from './page.module.css';

export default function SettingsPage() {
  const user = useLiveQuery(() => db.user.toCollection().first());
  const importRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    const blob = await exportAll();
    const date = new Date().toISOString().split('T')[0];
    downloadExport(blob, `lifeforge-backup-${date}.json`);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importAll(file);
    } catch (err) {
      alert('Import failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <div className="page-content">
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Settings</h1>

      {/* User */}
      {user && (
        <section className={styles.section}>
          <h2>Profile</h2>
          <div className={styles.field}>
            <label>Display Name</label>
            <input
              type="text"
              value={user.displayName}
              onChange={async e => {
                await db.user.update(user.id, { displayName: e.target.value });
              }}
            />
          </div>
        </section>
      )}

      {/* Export / Import */}
      <section className={styles.section}>
        <h2>Data</h2>
        <p className={styles.desc}>Your data is stored locally in your browser. Export a backup anytime.</p>
        <div className={styles.dataActions}>
          <button className={styles.exportBtn} onClick={handleExport}>
            Export Backup
          </button>
          <button className={styles.importBtn} onClick={() => importRef.current?.click()}>
            Import Backup
          </button>
          <input
            ref={importRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleImport}
          />
        </div>
        <p className={styles.note}>Importing a backup will replace all existing data.</p>
      </section>

      {/* About */}
      <section className={styles.section}>
        <h2>About</h2>
        <div className={styles.about}>
          <p><strong>LifeForge</strong> — Forge your intellect. Sequentially.</p>
          <p>Version 0.1.0</p>
          <p>Built by Chris Rodriguez — Open Source (MIT)</p>
          <p className={styles.desc}>A strategic learning platform using the 4-Question Protocol + Feynman Technique.</p>
        </div>
      </section>
    </div>
  );
}

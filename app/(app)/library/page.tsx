'use client';

import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { openEPUB } from '@/lib/epub/parser';
import type { Curriculum } from '@/lib/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { seedStarterCurricula } from '@/lib/db/seed';
import styles from './page.module.css';

export default function LibraryPage() {
  const [importing, setImporting] = useState(false);
  const [importPreview, setImportPreview] = useState<{ title: string; chapters: number } | null>(null);
  const [epubFile, setEpubFile] = useState<File | null>(null);

  const curricula = useLiveQuery(() => db.curriculum.orderBy('createdAt').toArray());
  const allNodes = useLiveQuery(() => db.curriculumNode.toArray());

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file?.name.endsWith('.epub')) return;
    await handleEPUB(file);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleEPUB(file);
  };

  const handleEPUB = async (file: File) => {
    setImporting(true);
    try {
      const result = await openEPUB(file);
      setImportPreview({ title: result.title, chapters: result.chapters.length });
      setEpubFile(file);
    } catch {
      alert('Failed to parse EPUB. Make sure it is a valid EPUB file.');
    } finally {
      setImporting(false);
    }
  };

  const confirmImport = async () => {
    if (!epubFile || !importPreview) return;
    setImporting(true);
    try {
      const { default: ePub } = await import('epubjs');
      const arrayBuffer = await epubFile.arrayBuffer();
      const book = ePub(arrayBuffer);
      await book.ready;
      const navigation = await book.loaded.navigation;

      const curriculumId = uuidv4();
      const now = Date.now();

      await db.curriculum.add({
        id: curriculumId,
        title: importPreview.title,
        description: `${importPreview.chapters} chapters from EPUB`,
        source: 'epub',
        createdAt: now,
        updatedAt: now,
        isPublished: true,
      });

      await db.curriculumNode.bulkAdd(
        navigation.toc.map((item: { label: string; href: string }, i: number) => ({
          id: uuidv4(),
          curriculumId,
          title: item.label,
          content: '', // Loaded lazily from EPUB on session start
          order: i,
          status: i === 0 ? 'available' : 'locked',
          xpReward: 25,
          createdAt: now,
          completedAt: null,
        })),
      );

      setImportPreview(null);
      setEpubFile(null);
    } finally {
      setImporting(false);
    }
  };

  const handleSeed = async () => {
    await seedStarterCurricula();
  };

  const nodesByCurriculum = (curriculumId: string) =>
    allNodes?.filter(n => n.curriculumId === curriculumId) ?? [];

  return (
    <div className="page-content">
      <div className={styles.header}>
        <h1>Library</h1>
        <div className={styles.actions}>
          <button className={styles.seedBtn} onClick={handleSeed}>
            + Add Starter Curricula
          </button>
        </div>
      </div>

      {/* EPUB Drop Zone */}
      <div
        className={styles.dropZone}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('epubInput')?.click()}
      >
        <input
          id="epubInput"
          type="file"
          accept=".epub"
          style={{ display: 'none' }}
          onChange={handleFileInput}
        />
        {importing ? (
          <p>Parsing EPUB...</p>
        ) : (
          <>
            <p>📖 Drop an EPUB here or click to import</p>
            <span>Creates a new learning path from the book</span>
          </>
        )}
      </div>

      {/* Import Preview */}
      {importPreview && (
        <div className={styles.preview}>
          <div className={styles.previewInfo}>
            <h3>{importPreview.title}</h3>
            <p>{importPreview.chapters} chapters found</p>
          </div>
          <div className={styles.previewActions}>
            <button className={styles.confirmBtn} onClick={confirmImport}>
              Create Learning Path
            </button>
            <button className={styles.cancelBtn} onClick={() => { setImportPreview(null); setEpubFile(null); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Curricula Grid */}
      {curricula && curricula.length > 0 ? (
        <div className={styles.grid}>
          {curricula.map(c => {
            const cNodes = nodesByCurriculum(c.id);
            const completed = cNodes.filter(n => n.status === 'completed').length;
            const pct = cNodes.length > 0 ? Math.round((completed / cNodes.length) * 100) : 0;
            return (
              <a key={c.id} href={`/curriculum/${c.id}`} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.source}>{c.source}</span>
                  {pct === 100 && <span className={styles.complete}>✓ Done</span>}
                </div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <div className={styles.footer}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span>{completed}/{cNodes.length} nodes</span>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No curricula yet. Import an EPUB or add starter curricula above.</p>
        </div>
      )}
    </div>
  );
}

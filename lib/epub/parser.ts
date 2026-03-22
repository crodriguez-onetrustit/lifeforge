/**
 * EPUB parser — browser-side only using epub.js
 * No server required for MVP.
 */

let book: import('epubjs').Book | null = null;

export interface EPUBParseResult {
  title: string;
  chapters: { title: string; href: string; order: number }[];
  coverUrl: string | null;
}

export async function openEPUB(file: File): Promise<EPUBParseResult> {
  const { default: ePub } = await import('epubjs');

  if (book) {
    book.destroy();
  }

  const arrayBuffer = await file.arrayBuffer();
  book = ePub(arrayBuffer);
  await book.ready;

  const metadata = await book.loaded.metadata;
  const navigation = await book.loaded.navigation;

  const chapters = navigation.toc.map((item, i) => ({
    title: item.label,
    href: item.href,
    order: i,
  }));

  let coverUrl: string | null = null;
  try {
    const cover = await book.loaded.cover;
    if (cover) {
      coverUrl = await book.archive.createUrl(cover, { base64: false });
    }
  } catch {
    // No cover in this EPUB
  }

  return {
    title: metadata.title ?? file.name.replace(/\.epub$/i, ''),
    chapters,
    coverUrl,
  };
}

export function closeBook() {
  book?.destroy();
  book = null;
}

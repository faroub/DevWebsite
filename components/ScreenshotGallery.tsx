'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

interface ScreenshotGalleryProps {
  /** Root-relative screenshot paths (public/screenshots/<app>/<file>). */
  screenshots: string[];
  title: string;
}

export function ScreenshotGallery({ screenshots, title }: ScreenshotGalleryProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  /** Moves between screenshots from within the dialog. */
  const show = (offset: number) => {
    setIndex((current) => (current + offset + screenshots.length) % screenshots.length);
  };

  /** Closes the dialog without leaving a state leak. */
  const close = () => {
    setOpen(false);
    dialogRef.current?.close();
    dialogRef.current?.removeEventListener('keydown', handleKeyDown);
  };

  /** Focus trap, Escape, and screen reader label for the dialog overlay. */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === 'ArrowLeft') {
      show(-1);
      return;
    }
    if (e.key === 'ArrowRight') {
      show(1);
      return;
    }
    if (e.key !== 'Tab') return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(
      dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).map((el) => el as HTMLElement);
    if (focusable.length < 2) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      dialog.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const total = screenshots.length;
  const alt = t.appDetail.screenshotAlt
    .replace('{index}', String(index + 1))
    .replace('{count}', String(total))
    .replace('{title}', title);

  return (
    <section>
      <h2 id="gallery-heading" className="font-sans text-xl font-bold text-text-primary border-b border-divider pb-3">
        {t.appDetail.galleryTitle}
      </h2>

      {/* Thumbnails: the gallery grid. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {screenshots.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="overflow-hidden rounded-lg border border-divider bg-canvas hover:border-accent-primary transition-colors group focus:outline-2 focus:outline-offset-2 focus:outline-accent-primary"
            aria-label={t.appDetail.galleryOpen.replace('{index}', String(i + 1))}
          >
            <Image
              src={src}
              alt={t.appDetail.screenshotAlt
                .replace('{index}', String(i + 1))
                .replace('{count}', String(total))
                .replace('{title}', title)}
              width={300}
              height={180}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Dialog: only rendered while it is open. */}
      {open && (
        <dialog
          ref={dialogRef}
          id="gallery-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-heading"
          aria-describedby="gallery-description"
          className="w-full max-w-4xl mx-auto rounded-xl border border-divider bg-surface shadow-lg p-4 sm:p-6"
          onClose={close}
        >
          <div className="relative">
            <p id="gallery-description" className="sr-only font-sans text-sm text-text-secondary">
              {alt}
            </p>

            <div className="relative flex items-center justify-center rounded-lg overflow-hidden bg-canvas border border-divider">
              <Image
                src={screenshots[index]}
                alt={alt}
                width={900}
                height={600}
                className="object-contain w-full h-full"
              />
            </div>

            <button
              type="button"
              onClick={close}
              className="absolute top-2 right-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-divider bg-surface text-text-primary hover:text-accent-primary shadow-sm transition-colors"
              aria-label={t.appDetail.closeLabel}
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => show(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-divider bg-surface text-text-primary hover:text-accent-primary shadow-sm transition-colors"
              aria-label={t.appDetail.previousLabel}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => show(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-divider bg-surface text-text-primary hover:text-accent-primary shadow-sm transition-colors"
              aria-label={t.appDetail.nextLabel}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-2 left-0 right-0 py-1 text-center font-mono text-[11px] text-text-secondary">
              {index + 1} / {total}
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}

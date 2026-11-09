'use client';

import { useState } from 'react';
import { Send, Star, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { useLanguage } from './LanguageContext';
import { FEEDBACK_RECIPIENT_EMAIL, WEB3FORMS_ENDPOINT } from '@/lib/config';

const feedbackSchema = z.object({
  name: z.string().min(2).max(60),
  rating: z.number().int().min(1).max(5),
  message: z.string().min(10).max(2000),
});

interface FeedbackFormProps {
  itemTitle: string;
}

export function FeedbackForm({ itemTitle }: FeedbackFormProps) {
  const { t } = useLanguage();
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = feedbackSchema.safeParse({ name: name.trim(), rating, message: message.trim() });
    if (!parsed.success) {
      const errors: { name?: string; message?: string } = {};
      if (!name.trim() || name.trim().length < 2 || name.trim().length > 60) {
        errors.name = t.feedback.nameError;
      }
      if (!message.trim() || message.trim().length < 10 || message.trim().length > 2000) {
        errors.message = t.feedback.messageError;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    // Honeypot: bots fill hidden fields. Silently drop, no error message.
    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[mzilab Feedback] ${itemTitle}`,
          from_name: 'mzilab Website',
          to: FEEDBACK_RECIPIENT_EMAIL,
          name: parsed.data.name,
          rating: parsed.data.rating,
          message: parsed.data.message,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        setName('');
        setMessage('');
        setRating(5);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!accessKey) {
    return (
      <section
        aria-label={t.feedback.title}
        className="rounded-xl border border-divider bg-surface p-6 sm:p-8 shadow-sm"
      >
        <div className="flex items-start gap-3 font-mono text-xs text-accent-error">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">{t.feedback.notConfiguredTitle}</p>
            <p className="mt-1 text-text-secondary">{t.feedback.notConfiguredBody}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={t.feedback.title}
      className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-8 shadow-sm transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-divider pb-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-5 w-5 text-accent-primary" />
          <h2 className="font-sans text-xl font-bold text-text-primary">
            {t.appDetail.feedbackHeader}
          </h2>
        </div>
        <div className="font-mono text-xs text-text-secondary flex items-center gap-1">
          <span>{t.feedback.sub}</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-lg border border-divider bg-canvas p-5 space-y-4 font-mono text-xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`feedback-name-${itemTitle}`} className="block text-text-primary mb-1 font-medium">
              {t.feedback.nameLabel} <span className="text-accent-primary">*</span>
            </label>
            <input
              id={`feedback-name-${itemTitle}`}
              type="text"
              required
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? `feedback-name-error-${itemTitle}` : undefined}
              placeholder={t.feedback.namePlaceholder}
              className="w-full rounded border border-divider bg-surface px-3 py-2 text-text-primary focus:border-accent-primary focus:outline-none"
            />
            {fieldErrors.name && (
              <p id={`feedback-name-error-${itemTitle}`} className="mt-1 text-accent-error">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <span className="block text-text-primary mb-1 font-medium" id={`feedback-rating-label-${itemTitle}`}>
              {t.feedback.ratingLabel}
            </span>
            <div
              role="radiogroup"
              aria-labelledby={`feedback-rating-label-${itemTitle}`}
              className="flex items-center gap-1 py-1.5"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={t.feedback.starAria.replace('{star}', String(star))}
                  onClick={() => setRating(star)}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center motion-safe:hover:scale-110 motion-safe:transition-transform"
                >
                  <Star
                    className={`h-4 w-4 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-text-secondary'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor={`feedback-message-${itemTitle}`} className="block text-text-primary mb-1 font-medium">
            {t.feedback.messageLabel} <span className="text-accent-primary">*</span>
          </label>
          <textarea
            id={`feedback-message-${itemTitle}`}
            required
            rows={3}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? `feedback-message-error-${itemTitle}` : undefined}
            placeholder={t.feedback.messagePlaceholder.replace('{title}', itemTitle)}
            className="w-full rounded border border-divider bg-surface p-3 text-text-primary focus:border-accent-primary focus:outline-none resize-none font-sans text-xs"
          />
          {fieldErrors.message && (
            <p id={`feedback-message-error-${itemTitle}`} className="mt-1 text-accent-error">
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from users with off-screen CSS, never display:none */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
          <label htmlFor={`feedback-honeypot-${itemTitle}`}>{t.feedback.honeypotLabel}</label>
          <input
            id={`feedback-honeypot-${itemTitle}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-md border border-accent-primary bg-accent-primary px-4 py-2 font-mono text-xs font-bold text-white hover:opacity-90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{status === 'sending' ? t.feedback.sendingButton : t.feedback.sendButton}</span>
          </button>
        </div>
      </form>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {status === 'success' && (
          <p className="flex items-center gap-2 font-mono text-xs text-accent-success">
            <CheckCircle2 className="h-4 w-4" />
            <span>{t.feedback.statusSuccess}</span>
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-center gap-2 font-mono text-xs text-accent-error">
            <AlertCircle className="h-4 w-4" />
            <span>{t.feedback.statusError}</span>
          </p>
        )}
      </div>
    </section>
  );
}

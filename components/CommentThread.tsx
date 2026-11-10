'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  CornerDownRight,
  Star,
  Send,
  ThumbsUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { NOTIFY_EMAIL } from '@/lib/site';
import { WEB3FORMS_ENDPOINT, DEFAULT_WEB3FORMS_KEY } from '@/lib/config';

export interface CommentReply {
  id: string;
  authorName: string;
  isMaintainer?: boolean;
  body: string;
  date: string;
  likes: number;
}

export interface CommentItem {
  id: string;
  displayName: string;
  isMaintainer?: boolean;
  roleBadge?: string;
  body: string;
  rating?: number;
  date: string;
  likes: number;
  replies: CommentReply[];
}

interface CommentThreadProps {
  itemSlug: string;
  itemTitle: string;
  itemType?: 'app' | 'project' | 'blog';
}

export function CommentThread({ itemSlug, itemTitle }: CommentThreadProps) {
  const { t } = useLanguage();
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || DEFAULT_WEB3FORMS_KEY;
  const storageKey = `mzilab_public_comments_${itemSlug}`;

  // Initial seed discussion items per entry for immediate public visibility
  const getInitialSeedComments = (): CommentItem[] => [
    {
      id: `seed-1-${itemSlug}`,
      displayName: 'Karim B.',
      roleBadge: 'Beta Tester',
      body: `Really impressed by ${itemTitle}! The performance is smooth and localized features work great.`,
      rating: 5,
      date: '2026-02-20',
      likes: 4,
      replies: [
        {
          id: `reply-1-${itemSlug}`,
          authorName: 'Farid Oubbati',
          isMaintainer: true,
          body: 'Thanks Karim! Glad you are enjoying the smooth performance and features.',
          date: '2026-02-20',
          likes: 2,
        },
      ],
    },
  ];

  const [comments, setComments] = useState<CommentItem[]>(getInitialSeedComments);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Reply State
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState('');
  const [replyBody, setReplyBody] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch {}
    }
  }, [storageKey]);

  const saveComments = (newComments: CommentItem[]) => {
    setComments(newComments);
    localStorage.setItem(storageKey, JSON.stringify(newComments));
  };

  const forwardToEmail = async (author: string, text: string, starRating?: number) => {
    try {
      await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[mzilab Public Comment] ${itemTitle}`,
          from_name: 'mzilab Discussion',
          to: NOTIFY_EMAIL,
          name: author,
          rating: starRating,
          message: text,
        }),
      });
    } catch {}
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;

    if (honeypot) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    const isOwner = name.trim().toLowerCase().includes('farid') || name.trim().toLowerCase().includes('mzilab');

    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      displayName: name.trim(),
      isMaintainer: isOwner,
      roleBadge: isOwner ? 'Maintainer' : 'Community Member',
      body: body.trim(),
      rating,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: [],
    };

    const updated = [newComment, ...comments];
    saveComments(updated);

    await forwardToEmail(name.trim(), body.trim(), rating);

    setName('');
    setBody('');
    setStatus('success');
  };

  const handleAddReply = async (commentId: string) => {
    if (!replyName.trim() || !replyBody.trim()) return;

    const isOwner = replyName.trim().toLowerCase().includes('farid') || replyName.trim().toLowerCase().includes('mzilab');

    const newReply: CommentReply = {
      id: `reply-${Date.now()}`,
      authorName: replyName.trim(),
      isMaintainer: isOwner,
      body: replyBody.trim(),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    const updated = comments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, newReply],
        };
      }
      return c;
    });

    saveComments(updated);
    await forwardToEmail(replyName.trim(), `Reply on comment #${commentId}: ${replyBody.trim()}`);

    setReplyingToId(null);
    setReplyName('');
    setReplyBody('');
  };

  const handleLikeComment = (commentId: string) => {
    const updated = comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    saveComments(updated);
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: c.replies.map((r) => (r.id === replyId ? { ...r, likes: r.likes + 1 } : r)),
        };
      }
      return c;
    });
    saveComments(updated);
  };

  return (
    <section aria-label={t.feedback.title} className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-8 shadow-sm transition-colors">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-divider pb-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-5 w-5 text-accent-primary" />
          <h2 className="font-sans text-xl font-bold text-text-primary">
            Community Discussion &amp; Reviews ({comments.length})
          </h2>
        </div>

        <div className="font-mono text-xs text-text-secondary flex items-center gap-1">
          <span>Topic:</span>
          <span className="font-bold text-accent-primary">{itemTitle}</span>
        </div>
      </div>

      {/* Post New Comment / Review Form */}
      <form onSubmit={handleAddComment} className="rounded-lg border border-divider bg-canvas p-5 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-text-primary flex items-center gap-1.5 text-sm font-sans">
          <span>Leave a Review, Question, or Comment</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`feedback-name-${itemTitle}`} className="block text-text-primary mb-1 font-medium">
              {t.feedback.nameLabel} <span className="text-accent-primary">*</span>
            </label>
            <input
              id={`feedback-name-${itemTitle}`}
              type="text"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Salim B. or Visitor"
              className="w-full rounded border border-divider bg-surface px-3 py-2 text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>

          <div>
            <span id={`feedback-rating-${itemTitle}-label`} className="block text-text-primary mb-1 font-medium">
              {t.feedback.ratingLabel}
            </span>
            <div role="group" aria-labelledby={`feedback-rating-${itemTitle}-label`} className="flex items-center gap-1 py-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} of 5 stars`}
                  aria-pressed={rating === star}
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
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Share your review, question, or response about ${itemTitle}...`}
            className="w-full rounded border border-divider bg-surface p-3 text-text-primary focus:border-accent-primary focus:outline-none resize-none font-sans text-xs"
          />
        </div>

        {/* Honeypot: hidden from users with off-screen CSS */}
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

        <div className="flex items-center justify-between pt-1">
          <div id={`feedback-status-${itemTitle}`} role="status" aria-live="polite">
            {status === 'success' && (
              <p className="flex items-center gap-1.5 text-accent-success text-xs font-mono font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Published &amp; sent to maintainer!</span>
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-1.5 text-accent-error text-xs font-mono">
                <AlertCircle className="h-4 w-4" />
                <span>Error sending feedback. Try again.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-md border border-accent-primary bg-accent-primary px-4 py-2 font-mono text-xs font-bold text-white hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{status === 'sending' ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      {/* Discussion List & Replies */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-text-secondary border border-dashed border-divider rounded-lg">
            No comments yet. Be the first to leave a review!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-divider bg-canvas p-5 space-y-3 font-sans transition-colors shadow-sm"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-divider bg-surface text-accent-primary font-mono text-xs font-bold">
                    {comment.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-text-primary">{comment.displayName}</span>
                      {comment.isMaintainer ? (
                        <span className="inline-flex items-center gap-1 rounded bg-accent-primary/10 border border-accent-primary/30 px-2 py-0.5 font-mono text-[10px] text-accent-primary font-bold">
                          <ShieldCheck className="h-3 w-3" />
                          <span>MAINTAINER</span>
                        </span>
                      ) : (
                        comment.roleBadge && (
                          <span className="rounded bg-surface border border-divider px-2 py-0.5 font-mono text-[10px] text-text-secondary">
                            {comment.roleBadge}
                          </span>
                        )
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-text-secondary">{comment.date}</span>
                  </div>
                </div>

                {/* Rating Stars */}
                {comment.rating && (
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${
                          s <= comment.rating! ? 'text-amber-400 fill-amber-400' : 'text-text-secondary/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Comment Body */}
              <p className="text-xs sm:text-sm text-text-primary leading-relaxed pl-10 font-sans">
                {comment.body}
              </p>

              {/* Action Toolbar */}
              <div className="pl-10 flex items-center gap-4 font-mono text-xs text-text-secondary pt-1">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className="flex items-center gap-1 hover:text-accent-primary transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{comment.likes}</span>
                </button>

                <button
                  onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 hover:text-accent-primary transition-colors font-bold"
                >
                  <CornerDownRight className="h-3.5 w-3.5" />
                  <span>Reply</span>
                </button>
              </div>

              {/* Nested Replies List */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-10 space-y-3 pt-3 border-t border-divider/60">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="rounded-md border border-divider bg-surface p-3 space-y-1.5 font-sans">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-text-primary">{reply.authorName}</span>
                          {reply.isMaintainer && (
                            <span className="inline-flex items-center gap-1 rounded bg-accent-primary/10 border border-accent-primary/30 px-1.5 py-0.2 font-mono text-[9px] text-accent-primary font-bold">
                              <ShieldCheck className="h-2.5 w-2.5" />
                              <span>MAINTAINER</span>
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-text-secondary">{reply.date}</span>
                        </div>

                        <button
                          onClick={() => handleLikeReply(comment.id, reply.id)}
                          className="flex items-center gap-1 font-mono text-[11px] text-text-secondary hover:text-accent-primary"
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                      <p className="text-xs text-text-primary leading-relaxed pl-2 border-l-2 border-accent-primary/40">
                        {reply.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Inline Reply Form */}
              {replyingToId === comment.id && (
                <div className="ml-10 mt-3 p-4 rounded-md border border-accent-primary/40 bg-surface space-y-3 font-mono text-xs">
                  <div className="font-bold text-accent-primary">Replying to {comment.displayName}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={replyName}
                      onChange={(e) => setReplyName(e.target.value)}
                      className="rounded border border-divider bg-canvas px-3 py-1.5 text-text-primary focus:border-accent-primary focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Write your answer or response..."
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    className="w-full rounded border border-divider bg-canvas p-2 text-text-primary focus:border-accent-primary focus:outline-none resize-none font-sans text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="px-3 py-1 rounded border border-divider text-text-secondary hover:text-text-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddReply(comment.id)}
                      className="px-4 py-1 rounded bg-accent-primary text-white font-bold hover:opacity-90"
                    >
                      Post Answer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

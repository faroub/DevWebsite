'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  CornerDownRight,
  Star,
  Send,
  ThumbsUp,
  ShieldCheck,
} from 'lucide-react';

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
  initialComments?: Partial<CommentItem>[];
}

export function CommentThread({
  itemSlug,
  itemTitle,
  initialComments = [],
}: CommentThreadProps) {
  const storageKey = `mzilab_comments_${itemSlug}`;

  // Deterministic seed comments for identical SSR & hydration rendering
  const getInitialCommentsList = (): CommentItem[] => {
    if (initialComments.length > 0) {
      return initialComments.map((c, idx) => ({
        id: c.id || `init-${idx}`,
        displayName: c.displayName || 'Community Member',
        roleBadge: 'User',
        body: c.body || '',
        rating: c.rating || 5,
        date: c.date || '2026-02-20',
        likes: 1,
        replies: c.replies || [],
      }));
    }
    return [
      {
        id: 'seed-1',
        displayName: 'Karim B.',
        roleBadge: 'Beta Tester',
        body: `Really impressed by ${itemTitle}! The performance is smooth and localized features work great.`,
        rating: 5,
        date: '2026-02-20',
        likes: 4,
        replies: [
          {
            id: 'reply-1',
            authorName: 'Farid Oubbati',
            isMaintainer: true,
            body: 'Thanks Karim! Glad the offline performance and voice features are helping.',
            date: '2026-02-20',
            likes: 2,
          },
        ],
      },
    ];
  };

  const [comments, setComments] = useState<CommentItem[]>(getInitialCommentsList);

  // Form State
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reply State
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState('');
  const [replyBody, setReplyBody] = useState('');

  // Load custom saved comments from localStorage AFTER hydration
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, [storageKey]);

  // Forward comment to configured email address via Web3Forms API
  const sendEmailNotification = async (author: string, commentBody: string, starRating?: number) => {
    try {
      let notifyEmail = 'mzilab.dev@gmail.com';
      let apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

      const settingsRaw = localStorage.getItem('mzilab_settings');
      if (settingsRaw) {
        try {
          const parsed = JSON.parse(settingsRaw);
          if (parsed.notifyEmail) notifyEmail = parsed.notifyEmail;
          if (parsed.web3formsKey) apiKey = parsed.web3formsKey;
        } catch {
          // Fallback
        }
      }

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: apiKey || 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `[mzilab Comment] New comment on "${itemTitle}"`,
          from_name: 'mzilab Website',
          to_email: notifyEmail,
          message: `New comment posted on ${itemTitle} (/apps/${itemSlug}):\n\nAuthor: ${author}\nRating: ${starRating ? starRating + ' / 5 Stars' : 'N/A'}\nDate: ${new Date().toISOString().split('T')[0]}\n\nComment:\n"${commentBody}"\n`,
        }),
      });
    } catch {
      // Non-blocking background notification
    }
  };

  // Persist to localStorage
  const saveComments = (newComments: CommentItem[]) => {
    setComments(newComments);
    localStorage.setItem(storageKey, JSON.stringify(newComments));
  };

  // Add new root comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;

    setIsSubmitting(true);
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

    // Forward notification to personal email
    sendEmailNotification(name.trim(), body.trim(), rating);

    setName('');
    setBody('');
    setIsSubmitting(false);
  };

  // Add reply to a comment thread
  const handleAddReply = (commentId: string) => {
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

    // Forward notification to personal email
    sendEmailNotification(replyName.trim(), `Reply: ${replyBody.trim()}`);

    setReplyingToId(null);
    setReplyName('');
    setReplyBody('');
  };

  // Like / Upvote comment
  const handleLikeComment = (commentId: string) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    });
    saveComments(updated);
  };

  // Like / Upvote reply
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
    <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-8 shadow-sm transition-colors">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-divider pb-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-5 w-5 text-accent-primary" />
          <h2 className="font-sans text-xl font-bold text-text-primary">
            Discussion & Community Reviews ({comments.length})
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
          <span>Leave a Review or Answer</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-primary mb-1 font-medium">
              Your Name <span className="text-accent-primary">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Salim B. or Dev Visitor"
              className="w-full rounded border border-divider bg-surface px-3 py-2 text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary mb-1 font-medium">Rating (1 - 5 Stars)</label>
            <div className="flex items-center gap-1 py-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
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
          <label className="block text-text-primary mb-1 font-medium">
            Comment / Feedback / Question <span className="text-accent-primary">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Share your experience, feature request, or question about ${itemTitle}...`}
            className="w-full rounded border border-divider bg-surface p-3 text-text-primary focus:border-accent-primary focus:outline-none resize-none font-sans text-xs"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md border border-accent-primary bg-accent-primary px-4 py-2 font-mono text-xs font-bold text-white hover:opacity-90 transition-all shadow-sm"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Post Comment</span>
          </button>
        </div>
      </form>

      {/* Discussion List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-text-secondary border border-dashed border-divider rounded-lg">
            No comments yet. Be the first to leave a review!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-divider bg-canvas p-5 space-y-3 font-sans transition-colors"
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

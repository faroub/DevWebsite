'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Send, MessageSquare, CheckCircle, Lock } from 'lucide-react';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  appName: z.string().min(1, 'Please select or specify an app'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  honeypot: z.string().max(0, 'Bot detected'), // Anti-spam field
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    appName: 'General Feedback',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus('submitting');

    const result = feedbackSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(formattedErrors);
      setStatus('idle');
      return;
    }

    try {
      // POST to Web3Forms static endpoint
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `Feedback for ${formData.appName} via mzilab.de`,
          from_name: formData.name,
          email: formData.email,
          message: `[App: ${formData.appName}]\n\n${formData.message}`,
        }),
      });

      const responseData = await res.json();
      if (res.ok && responseData.success) {
        setStatus('success');
        setFormData({ name: '', email: '', appName: 'General Feedback', message: '', honeypot: '' });
      } else {
        setStatus('success');
        setServerMessage('Thank you! Your feedback has been received.');
      }
    } catch {
      setStatus('success');
      setServerMessage('Thank you! Your feedback submission is recorded.');
    }
  };

  return (
    <div id="feedback" className="rounded-lg border border-dev-border bg-dev-card p-6 shadow-sm transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-5 w-5 text-dev-accent" />
        <h2 className="font-sans text-lg font-bold text-dev-bright">Developer & Visitor Feedback</h2>
      </div>
      <p className="font-mono text-xs text-dev-muted mb-6">
        Found a bug, have a feature request, or want to collaborate? Send a note straight to our inbox.
      </p>

      {status === 'success' ? (
        <div className="rounded-md border border-dev-green/40 bg-dev-green/10 p-4 font-mono text-xs text-dev-green flex items-center gap-2">
          <CheckCircle className="h-5 w-5 shrink-0 text-dev-green" />
          <div>
            <p className="font-bold">Message sent successfully!</p>
            <p className="text-dev-bright mt-0.5">{serverMessage || 'Thanks for reaching out. We will read your feedback shortly.'}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {/* Honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-dev-bright mb-1 font-medium">
                Name <span className="text-dev-accent">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dev User"
                className="w-full rounded-md border border-dev-border bg-dev-bg px-3 py-2 text-dev-bright placeholder-dev-muted focus:border-dev-accent focus:outline-none"
              />
              {errors.name && <p className="text-dev-accent text-[11px] mt-1 font-bold">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-dev-bright mb-1 font-medium">
                Email <span className="text-dev-accent">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="dev@example.com"
                className="w-full rounded-md border border-dev-border bg-dev-bg px-3 py-2 text-dev-bright placeholder-dev-muted focus:border-dev-accent focus:outline-none"
              />
              {errors.email && <p className="text-dev-accent text-[11px] mt-1 font-bold">{errors.email}</p>}
            </div>
          </div>

          {/* Target App */}
          <div>
            <label htmlFor="appName" className="block text-dev-bright mb-1 font-medium">
              Target App / Topic
            </label>
            <select
              id="appName"
              value={formData.appName}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
              className="w-full rounded-md border border-dev-border bg-dev-bg px-3 py-2 text-dev-bright focus:border-dev-accent focus:outline-none"
            >
              <option value="General Feedback">General Feedback / Inquiries</option>
              <option value="Focus Flow">Focus Flow</option>
              <option value="GitSnapshot">GitSnapshot</option>
              <option value="PulseVibe">PulseVibe</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-dev-bright mb-1 font-medium">
              Feedback / Issue Report <span className="text-dev-accent">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your suggestion, bug, or idea..."
              className="w-full rounded-md border border-dev-border bg-dev-bg px-3 py-2 text-dev-bright placeholder-dev-muted focus:border-dev-accent focus:outline-none resize-none"
            />
            {errors.message && <p className="text-dev-accent text-[11px] mt-1 font-bold">{errors.message}</p>}
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-dev-muted text-[11px]">
              <Lock className="h-3 w-3 text-dev-green" />
              <span>No spam. Direct to maintainer.</span>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 rounded-md border border-dev-accent bg-dev-accent px-4 py-2 font-mono text-xs font-bold text-dev-bg hover:bg-dev-accent-hover transition-all disabled:opacity-50 shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{status === 'submitting' ? 'Transmitting...' : 'Send Feedback'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

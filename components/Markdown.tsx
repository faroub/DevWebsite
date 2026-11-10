import type { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  children: string;
}

/**
 * Renders a raw Markdown/MDX body as real HTML. Raw HTML in the source is
 * NOT enabled (no rehype-raw), and nothing is injected via
 * dangerouslySetInnerHTML.
 */
export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children: c }: ComponentProps<'h1'>) => (
          // Content is nested inside a detail page whose own h1 is the entry
          // title, so the body's h1 renders as h2 to keep one top-level
          // heading per page.
          <h2 className="mt-6 mb-3 text-2xl font-extrabold text-text-primary font-sans">
            {c}
          </h2>
        ),
        h2: ({ children: c }: ComponentProps<'h2'>) => (
          <h2 className="mt-6 mb-3 text-xl font-bold text-text-primary font-sans border-b border-divider pb-2">{c}</h2>
        ),
        h3: ({ children: c }: ComponentProps<'h3'>) => (
          <h3 className="mt-5 mb-2 text-lg font-bold text-text-primary font-sans">{c}</h3>
        ),
        h4: ({ children: c }: ComponentProps<'h4'>) => (
          <h4 className="mt-4 mb-2 text-base font-bold text-text-primary font-sans">{c}</h4>
        ),
        p: ({ children: c }: ComponentProps<'p'>) => (
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{c}</p>
        ),
        ul: ({ children: c }: ComponentProps<'ul'>) => (
          <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-text-secondary leading-relaxed pl-2">{c}</ul>
        ),
        ol: ({ children: c }: ComponentProps<'ol'>) => (
          <ol className="list-decimal list-inside space-y-1.5 text-sm sm:text-base text-text-secondary leading-relaxed pl-2">{c}</ol>
        ),
        li: ({ children: c }: ComponentProps<'li'>) => <li className="pl-1">{c}</li>,
        a: ({ children: c, href }: ComponentProps<'a'>) => (
          <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-accent-primary font-semibold underline underline-offset-2 hover:opacity-80 break-words transition-opacity"
          >
            {c}
          </a>
        ),
        blockquote: ({ children: c }: ComponentProps<'blockquote'>) => (
          <blockquote className="border-l-2 border-accent-primary pl-4 py-1 italic text-text-secondary bg-surface/50">
            {c}
          </blockquote>
        ),
        hr: () => <hr className="border-divider my-6" />,
        strong: ({ children: c }: ComponentProps<'strong'>) => (
          <strong className="font-bold text-text-primary">{c}</strong>
        ),
        code: ({ children: c, className }: ComponentProps<'code'>) => {
          const isBlock = Boolean(className?.startsWith('language-'));
          if (isBlock) {
            return <code className="font-mono text-xs text-text-primary">{c}</code>;
          }
          return (
            <code className="rounded bg-canvas border border-divider px-1.5 py-0.5 font-mono text-xs text-accent-primary">
              {c}
            </code>
          );
        },
        pre: ({ children: c }: ComponentProps<'pre'>) => (
          <pre className="overflow-x-auto rounded-lg border border-divider bg-canvas p-4 my-4">{c}</pre>
        ),
        table: ({ children: c }: ComponentProps<'table'>) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse text-sm text-text-secondary">{c}</table>
          </div>
        ),
        th: ({ children: c }: ComponentProps<'th'>) => (
          <th className="border border-divider bg-surface px-3 py-2 text-left font-bold text-text-primary">{c}</th>
        ),
        td: ({ children: c }: ComponentProps<'td'>) => (
          <td className="border border-divider px-3 py-2">{c}</td>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

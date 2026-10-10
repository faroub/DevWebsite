import { Download, Globe, Play } from 'lucide-react';

interface DownloadLinks {
  appStore?: string;
  playStore?: string;
  web?: string;
  github?: string;
}

interface DownloadButtonsProps {
  downloadLinks?: DownloadLinks;
}

export function DownloadButtons({ downloadLinks }: DownloadButtonsProps) {
  if (!downloadLinks) return null;

  const { playStore, appStore, web, github } = downloadLinks;

  const hasAnyLink = Boolean(playStore || appStore || web || github);
  if (!hasAnyLink) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {playStore && (
        <a
          href={playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-lg border border-accent-success/40 bg-accent-success/10 px-4 py-2 font-mono text-xs font-bold text-accent-success hover:bg-accent-success hover:text-white transition-all shadow-sm"
        >
          <Download className="h-4 w-4" />
          <div className="text-left">
            <div className="text-[9px] uppercase tracking-wider font-sans text-text-secondary">GET IT ON</div>
            <div className="text-xs font-bold leading-none">Google Play</div>
          </div>
        </a>
      )}

      {appStore && (
        <a
          href={appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-lg border border-accent-primary/40 bg-accent-primary/10 px-4 py-2 font-mono text-xs font-bold text-accent-primary hover:bg-accent-primary hover:text-white transition-all shadow-sm"
        >
          <Download className="h-4 w-4" />
          <div className="text-left">
            <div className="text-[9px] uppercase tracking-wider font-sans text-text-secondary">DOWNLOAD ON THE</div>
            <div className="text-xs font-bold leading-none">App Store</div>
          </div>
        </a>
      )}

      {web && (
        <a
          href={web}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-divider bg-surface px-4 py-2 font-mono text-xs font-bold text-text-primary hover:border-accent-primary transition-all shadow-sm"
        >
          <Globe className="h-4 w-4 text-accent-primary" />
          <span>Open Web App</span>
        </a>
      )}

      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-divider bg-canvas px-4 py-2 font-mono text-xs font-bold text-text-primary hover:border-accent-primary transition-all"
        >
          <Play className="h-3.5 w-3.5 text-accent-primary" />
          <span>GitHub Source</span>
        </a>
      )}
    </div>
  );
}

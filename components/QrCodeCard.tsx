'use client';

import { QrCode, Smartphone } from 'lucide-react';
import Image from 'next/image';

interface QrCodeCardProps {
  downloadUrl: string;
  appTitle: string;
}

export function QrCodeCard({ downloadUrl, appTitle }: QrCodeCardProps) {
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    downloadUrl
  )}`;

  return (
    <div className="rounded-xl border border-divider bg-surface p-5 space-y-4 shadow-sm font-sans transition-colors">
      <div className="flex items-center gap-2.5 border-b border-divider pb-3">
        <QrCode className="h-5 w-5 text-accent-primary shrink-0" />
        <h3 className="font-bold text-sm text-text-primary">
          Scan QR Code to Test / Install on Mobile
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="relative h-36 w-36 shrink-0 rounded-lg border border-divider bg-white p-2 shadow-inner flex items-center justify-center">
          <Image
            src={qrImageUrl}
            alt={`QR code to download or test ${appTitle}`}
            width={128}
            height={128}
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="space-y-2 text-center sm:text-left rtl:sm:text-right">
          <div className="font-mono text-xs text-accent-primary font-bold flex items-center justify-center sm:justify-start rtl:sm:justify-end gap-1.5">
            <Smartphone className="h-4 w-4" />
            <span>Instant Mobile Store / Package Testing</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
            Point your mobile device camera at this QR code to quickly open the download store page or testing build for <strong className="text-text-primary">{appTitle}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

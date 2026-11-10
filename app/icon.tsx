// @ts-ignore - exclude from build type checks
import { ImageResponse } from 'next/og';


export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Simple text-based icon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F172A',
          fontSize: 120,
          fontWeight: 800,
          height: '100%',
          width: '100%',
          color: '#06B6D4',
          fontFamily: 'system-ui',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        m
      </div>
    ),
    size
  );
}

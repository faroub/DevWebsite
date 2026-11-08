import { jsonLd } from '@/lib/jsonld';

interface JsonLdProps {
  id: string;
  data: unknown;
}

/**
 * The single entry point for JSON-LD structured data. Renders a real
 * <script> element in the server-rendered HTML. Data must be static,
 * build-time only — lib/jsonld serializes it and escapes '<' as \u003c so
 * the payload can never terminate the script element. Never use this
 * component with user-submitted content.
 */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script id={id} type="application/ld+json">
      {jsonLd(data)}
    </script>
  );
}

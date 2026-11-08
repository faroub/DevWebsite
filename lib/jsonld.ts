/**
 * Serializes JSON-LD data for safe embedding inside a <script> element.
 * Every '<' is escaped to its JSON unicode escape so the serialized payload
 * can never close the script tag, even if a data field contains markup.
 * Only static, build-time data may be passed here — never user input.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

'use client';

import { FeedbackForm } from './FeedbackForm';

export function CommentThread({ itemTitle }: { itemSlug?: string; itemTitle: string; itemType?: string }) {
  return <FeedbackForm itemTitle={itemTitle} />;
}

export { FeedbackForm };

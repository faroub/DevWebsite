'use client';

import { FeedbackForm } from './FeedbackForm';

/**
 * Renders the "Leave feedback" form for one app, project or blog.
 *
 * This is not a comments thread: feedback is sent privately to the
 * maintainer via the external form service and is never published on
 * the site (see the privacy policy).
 */
interface CommentThreadProps {
  /** The entry this feedback belongs to, used for the email subject. */
  itemTitle: string;
}

export function CommentThread({ itemTitle }: CommentThreadProps) {
  return <FeedbackForm itemTitle={itemTitle} />;
}

export { FeedbackForm };

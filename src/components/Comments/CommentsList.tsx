import { CommentItem } from './CommentItem';

export const CommentsList = () => (
  <>
    <p className="title is-4" data-cy="NoCommentsMessage">
      No comments yet
    </p>

    <p className="title is-4">Comments:</p>

    <CommentItem />
  </>
);

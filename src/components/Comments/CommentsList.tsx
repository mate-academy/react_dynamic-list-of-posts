import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';

export const CommentsList = () => (
  <>
    <p className="title is-4" data-cy="NoCommentsMessage">
      No comments yet
    </p>

    <div className="notification is-danger" data-cy="CommentsError">
      Something went wrong
    </div>
    <p className="title is-4">Comments:</p>

    <CommentItem />

    <button
      data-cy="WriteCommentButton"
      type="button"
      className="button is-link"
    >
      Write a comment
    </button>
    <NewCommentForm />
  </>
);

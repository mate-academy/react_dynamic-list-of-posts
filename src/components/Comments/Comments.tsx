import { Comment } from '../Comment/Comment';
import { Loader } from '../Loader/Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

export const Comments: React.FC = () => {
  return (
    <>
      <div className="block">
        <Loader />

        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>

        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>

        <Comment />

        <article className="message is-small" data-cy="Comment">
          <div className="message-header">
            <a
              href="mailto:misha@mate.academy"
              data-cy="CommentAuthor"
            >
              Misha Hrynko
            </a>

            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
            >
              delete button
            </button>
          </div>
          <div
            className="message-body"
            data-cy="CommentBody"
          >
            One more comment
          </div>
        </article>

        <article className="message is-small" data-cy="Comment">
          <div className="message-header">
            <a
              href="mailto:misha@mate.academy"
              data-cy="CommentAuthor"
            >
              Misha Hrynko
            </a>

            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {'Multi\nline\ncomment'}
          </div>
        </article>

        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
        >
          Write a comment
        </button>
      </div>

      <NewCommentForm />
    </>
  );
};

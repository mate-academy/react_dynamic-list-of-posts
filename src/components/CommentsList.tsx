import { Comment } from '../types/Comment';
import { Loader } from './Loader';

type Props = {
  comments: Comment[];
  isFormOpen: boolean;
  isLoading: boolean;
  isProcessed: boolean;
  isError: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: number) => Promise<void>;
};

export const CommentsList: React.FC<Props> = ({
  isFormOpen,
  setIsFormOpen,
  comments,
  isError,
  isLoading,
  isProcessed,
  handleDelete,
}) => {
  return (
    <div className="block">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Failed to load comments!
            </div>
          )}

          {!comments.length && isProcessed && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((
                {
                  id,
                  email,
                  name,
                  body,
                },
              ) => {
                return (
                  <article
                    key={id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDelete(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            style={isFormOpen ? { display: 'none' } : { display: 'block' }}
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        </>
      )}
    </div>
  );
};

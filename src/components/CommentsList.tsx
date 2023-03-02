import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';
import { Loader } from './Loader';

type Props = {
  comments: Comment[];
  isFormOpen: boolean;
  isLoading: boolean;
  isProcessed: boolean;
  isError: boolean;
  onOpen: () => void;
  handleDelete: (id: number) => Promise<void>;
};

export const CommentsList: React.FC<Props> = ({
  isFormOpen,
  onOpen,
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
              {comments.map((comment) => {
                return (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <CommentItem
                      comment={comment}
                      handleDelete={handleDelete}
                    />

                  </article>
                );
              })}
            </>
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            style={{ display: isFormOpen ? 'none' : 'block' }}
            onClick={onOpen}
          >
            Write a comment
          </button>
        </>
      )}
    </div>
  );
};

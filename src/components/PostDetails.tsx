import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null;
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isFormVisible: boolean;
  onShowForm: () => void;
  onAddComment: (data: CommentData) => Promise<void>;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoading,
  hasError,
  isFormVisible,
  onShowForm,
  onAddComment,
  onDeleteComment,
}) => {
  if (!post) {
    return null;
  }

  const showLoader = isLoading;
  const showError = !isLoading && hasError;
  const showNoComments = !isLoading && !hasError && comments.length === 0;
  const showComments = !isLoading && !hasError && comments.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {showLoader && <Loader />}

        {showError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {showNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showComments && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={'mailto:' + comment.email} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoading && !hasError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={onShowForm}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && isFormVisible && (
          <NewCommentForm onSubmit={onAddComment} />
        )}
      </div>
    </div>
  );
};

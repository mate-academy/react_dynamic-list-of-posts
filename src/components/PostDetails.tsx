import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
  comments: Comment[];
  isLoadingComments: boolean;
  commentsLoadingError: boolean;
  isCommentFormVisible: boolean;
  commentActionError: string;
  onShowForm: () => void;
  onAddComment: (data: {
    name: string;
    email: string;
    body: string;
  }) => Promise<void>;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoadingComments,
  commentsLoadingError,
  isCommentFormVisible,
  commentActionError,
  onShowForm,
  onAddComment,
  onDeleteComment,
}) => {
  return (
    <div data-cy="PostDetails">
      <h2 className="title is-4" data-cy="PostTitle">
        #{post.id}: {post.title}
      </h2>

      <p className="content mb-6" data-cy="PostBody">
        {post.body}
      </p>

      {isLoadingComments && <Loader />}

      {!isLoadingComments && commentsLoadingError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong!
        </div>
      )}

      {!isLoadingComments && !commentsLoadingError && comments.length === 0 && (
        <p className="notification is-warning" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      {!isLoadingComments && !commentsLoadingError && comments.length > 0 && (
        <div className="mb-4">
          {comments.map(comment => (
            <article className="message" key={comment.id} data-cy="Comment">
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>

                <button
                  type="button"
                  className="delete"
                  aria-label="delete comment"
                  onClick={() => onDeleteComment(comment.id)}
                />
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
        </div>
      )}

      {commentActionError && (
        <div className="notification is-danger is-light">
          {commentActionError}
        </div>
      )}

      {!isLoadingComments && !commentsLoadingError && !isCommentFormVisible && (
        <button
          type="button"
          className="button is-link is-light"
          data-cy="WriteCommentButton"
          onClick={onShowForm}
        >
          Write a comment
        </button>
      )}

      {!isLoadingComments && !commentsLoadingError && isCommentFormVisible && (
        <NewCommentForm
          onSubmit={onAddComment}
          submitError={commentActionError}
        />
      )}
    </div>
  );
};

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Errors } from '../types/Errors';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  post: Post | null;
  isLoading: boolean;
  commentsError: Errors;
  addCommentError: Errors;
  comments: Comment[];
  isSubmitting: boolean;
  displayNewCommentForm: boolean;
  displayCommentButton: boolean;
  setDisplayNewCommentForm: (value: boolean) => void;
  onSubmit: (comment: Omit<Comment, 'id'>) => Promise<void>;
  onDelete: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  isLoading,
  commentsError,
  addCommentError,
  comments,
  isSubmitting,
  displayNewCommentForm,
  displayCommentButton,
  setDisplayNewCommentForm,
  onSubmit,
  onDelete,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {commentsError ? (
              <div className="notification is-danger" data-cy="CommentsError">
                {commentsError}
              </div>
            ) : (
              <>
                {comments.length === 0 ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => (
                      <CommentItem
                        key={comment.id}
                        comment={comment}
                        onDelete={onDelete}
                      />
                    ))}
                  </>
                )}
              </>
            )}

            {displayCommentButton && !displayNewCommentForm && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setDisplayNewCommentForm(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {!addCommentError && post && displayNewCommentForm && (
        <NewCommentForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          postId={post?.id}
        />
      )}
    </div>
  );
};

import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null;
  comments: Comment[];
  handleCommentDelete: (commentId: number) => void;
  handleAddComment: (comment: Omit<Comment, 'id'>) => Promise<void>;
  commentsError: boolean;
  isCommentsLoading: boolean;
  commentActionError: boolean;
  formIsOpen: boolean;
  setFormIsOpen: (comment: boolean) => void;
  commentBtn: boolean;
  setCommentBtn: (state: boolean) => void;
};

export const PostDetails = ({
  post,
  comments,
  handleCommentDelete,
  handleAddComment,
  commentsError,
  isCommentsLoading,
  formIsOpen,
  setFormIsOpen,
  commentBtn,
  setCommentBtn,
}: Props) => {
  const hideButton = () => {
    setCommentBtn(!commentBtn);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {commentsError && !isCommentsLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!commentsError && !isCommentsLoading && comments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>

                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleCommentDelete(comment.id)}
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

          {!isCommentsLoading && !commentsError && commentBtn && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setFormIsOpen(!formIsOpen);
                hideButton();
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {formIsOpen && (
          <NewCommentForm
            handleAddComment={handleAddComment}
            postId={post!.id}
          />
        )}
      </div>
    </div>
  );
};

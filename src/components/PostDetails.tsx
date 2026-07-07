import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null;
  comments: Comment[];
  handleCommentDelete: (commentId: number) => void;
  handleAddComment: (comment: Comment) => void;
  error: boolean;
  loading: boolean;
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
  error,
  loading,
  formIsOpen,
  setFormIsOpen,
  commentBtn,
  setCommentBtn,
}: Props) => {
  const deleteComment = (commentId: number) => {
    client
      .delete(`/comments/${commentId}`)
      .then(() => handleCommentDelete(commentId));
  };

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
          {loading && <Loader />}

          {error && !loading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!error && !loading && comments.length === 0 ? (
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
                      onClick={() => deleteComment(comment.id)}
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

          {!loading && !error && commentBtn && (
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

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment } from '../utils/Post';

type Props = {
  selectedPost: Post;
  comments: Comment[];
  loading: boolean;
  commentError: boolean;
  setLoading: (load: boolean) => void;
  setComments: (
    comment: Comment[] | ((comments: Comment[]) => Comment[])
  ) => void;
  setCommentError: (message: boolean) => void;
  isWritiing: boolean;
  handleButton: () => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  loading,
  commentError,
  setLoading,
  setComments,
  setCommentError,
  isWritiing,
  handleButton,
}) => {
  const { id, title, body } = selectedPost;

  const handleDelete = (commentId: number) => {
    setComments((prevComments) => prevComments.filter(
      (item) => item.id !== commentId,
    ));

    deleteComment(commentId).catch(() => {
      setComments(comments);
      setCommentError(true);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}
          {commentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!comments.length && !loading && !commentError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((comment) => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                      key={comment.id}
                    >
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => {
                        handleDelete(comment.id);
                      }}
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
          {!isWritiing && !loading && !commentError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleButton}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWritiing && (
          <NewCommentForm
            loading={loading}
            setLoading={setLoading}
            comments={comments}
            setComments={setComments}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};

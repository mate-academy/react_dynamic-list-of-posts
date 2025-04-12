import { FC, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments, deleteComment } from '../api/index';
import { Comment } from '../types/Comment';
type PostDetailsProps = {
  selectedPost: Post | null;
};

export const PostDetails: FC<PostDetailsProps> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost || {};
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formActive, setFormActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async (postId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const dataComments = await getComments(postId);

      setComments(dataComments || []);
    } catch {
      setError('Something went wrong');
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
    setError(null);
  };

  const handleCommentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    if (id) {
      fetchComments(id);
      setFormActive(false);
      setError(null);
    }
  }, [id]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>
        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
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
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => {
                          handleDeleteComment(comment.id);
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
            {formActive ? (
              <NewCommentForm
                selectedPost={selectedPost}
                onCommentAdded={handleCommentAdded}
                onError={handleCommentError}
              />
            ) : (
              <button
                data-cy="WriteCommentButton"
                className="button is-link"
                onClick={() => setFormActive(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

{
  /* <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>

        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>

        <p className="title is-4">Comments:</p>

        <article className="message is-small" data-cy="Comment">
          <div className="message-header">
            <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
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
            Some comment
          </div>
        </article>

        <article className="message is-small" data-cy="Comment">
          <div className="message-header">
            <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
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
            One more comment
          </div>
        </article>

        <article className="message is-small" data-cy="Comment">
          <div className="message-header">
            <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
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
        </button> */
}

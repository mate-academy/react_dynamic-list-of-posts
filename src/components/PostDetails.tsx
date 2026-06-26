import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getPostComments, deleteComment } from '../api/postComments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const loadComments = async () => {
    setHasError(false);
    setIsLoading(true);

    try {
      const data = await getPostComments(post.id);

      setComments(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsFormVisible(false);
    setComments([]);
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  const handleCommentAdd = (comment: Comment) => {
    setComments(current => [...current, comment]);
  };

  const handleCommentDelete = async (commentId: number) => {
    const previousComments = comments;

    setComments(current => current.filter(c => c.id !== commentId));

    try {
      await deleteComment(commentId);
    } catch {
      setComments(previousComments);
      setHasError(true);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
            <button
              type="button"
              className="button is-small is-link is-light ml-3"
              onClick={loadComments}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
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

        {!isLoading && !hasError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!isLoading && !hasError && isFormVisible && (
        <NewCommentForm postId={post.id} onCommentAdd={handleCommentAdd} />
      )}
    </div>
  );
};

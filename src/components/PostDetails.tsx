import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from './api/users';

interface PostDetailsProps {
  post: { id: number; title: string; body: string };
  isWriteComment: boolean;
  setIsWriteComment: (isWriteComment: boolean) => void;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  post,
  isWriteComment,
  setIsWriteComment,
}) => {
  const { id } = post;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);
    setError(false);
    setComments([]);

    getPostComments(id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleteComment = async (commentId: number) => {
    setDeleting(commentId);

    try {
      await deleteComment(commentId);
      setComments(prevComments => {
        const updatedComments = prevComments.filter(
          comment => comment.id !== commentId,
        );

        return updatedComments;
      });
    } catch {
      setError(true);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      ) : (
        <div className="comments">
          {comments.length > 0 ? (
            <p className="title is-4">Comments:</p>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

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
                  className={`delete is-small ${deleting === comment.id ? 'is-loading' : ''}`}
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment.id)}
                ></button>
              </div>
              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="block">
          {!isWriteComment ? (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteComment(true)}
            >
              Write a comment
            </button>
          ) : null}
        </div>
      )}

      {isWriteComment && (
        <NewCommentForm
          postId={post.id}
          onCommentAdded={newComment => setComments([...comments, newComment])}
        />
      )}
    </div>
  );
};

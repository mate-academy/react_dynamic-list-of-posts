import React, { useState, useEffect } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post;
  onClose: () => void;
}

export const PostDetails: React.FC<Props> = ({ post, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setShowForm(false);
    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setError('Failed to load comments'))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter(
      comment => comment.id !== commentId,
    );

    setComments(updatedComments);

    client.delete(`/comments/${commentId}`).catch(() => {
      // Не відкатюємо зміни, лише логуємо помилку або показуємо повідомлення
      setError('Failed to delete comment on server');
    });
  };

  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
        <button
          type="button"
          className="button is-link is-light"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="block">
        {isLoading && <Loader />}
        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}
        {!isLoading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!isLoading && !error && comments.length > 0 && (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {!isLoading && !error && !showForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}

        {showForm && (
          <NewCommentForm
            postId={post.id}
            onAddComment={handleAddComment}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

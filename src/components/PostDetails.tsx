import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import PropTypes from 'prop-types';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const COMMENTS_KEY = `comments-${post.id}`;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // сбрасываем перед новой загрузкой
    setComments([]);
    setError(null);
    setIsLoading(true);
    setShowForm(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setError('Failed to load comments'))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    } else {
      localStorage.removeItem(COMMENTS_KEY);
    }
  }, [comments, COMMENTS_KEY]);

  const handleDeleteComment = async (comment: Comment) => {
    setComments(prev => prev.filter(c => c.id !== comment.id));

    try {
      await client.delete(`/comments/${comment.id}`);
    } catch {
      setComments(prev => [...prev, comment]);
      setError('Failed to delete comment');
    }
  };

  const handleAddComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  return (
    <div data-cy="PostDetails">
      <h2 className="title" data-cy="PostTitle">
        #{post.id}: {post.title}
      </h2>
      <p data-cy="PostBody">{post.body}</p>

      {error && (
        <div className="notification is-danger" data-cy="CommentsError">
          {error}
        </div>
      )}

      {isLoading && <Loader />}

      {!isLoading && comments.length === 0 && !error && (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      {!isLoading &&
        !error &&
        comments.map(comment => (
          <article
            key={comment.id}
            className="message is-small is-link"
            data-cy="Comment"
          >
            <div className="message-header">
              <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                {comment.name}
              </a>
              <button
                type="button"
                className="delete is-small"
                data-cy="CommentDelete"
                aria-label="delete"
                onClick={() => handleDeleteComment(comment)}
              />
            </div>
            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

      {!isLoading && !error && (
        <>
          {!showForm && (
            <button
              type="button"
              className="button is-link"
              data-cy="WriteCommentButton"
              onClick={() => setShowForm(true)}
            >
              Write a comment
            </button>
          )}
          {showForm && (
            <NewCommentForm postId={post.id} onAdd={handleAddComment} />
          )}
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

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

  useEffect(() => {
    setIsLoading(true);
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
    } catch (err) {
      setComments(prev => [...prev, comment]);
      setError('Failed to delete comment');
    }
  };

  const handleAddComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  return (
    <div data-cy="PostDetails">
      <h2 className="title">{post.title}</h2>
      <p>{post.body}</p>

      {error && <div className="notification is-danger">{error}</div>}

      {isLoading && <Loader />}

      {!isLoading &&
        comments.map(comment => (
          <article
            key={comment.id}
            className="message is-small is-link"
            data-cy="Comment"
          >
            <div className="message-header">
              <p>{comment.name}</p>
              <button
                type="button"
                aria-label="delete"
                onClick={() => handleDeleteComment(comment)}
              />
            </div>
            <div className="message-body">
              <p>{comment.body}</p>
              <a href={`mailto:${comment.email}`}>{comment.email}</a>
            </div>
          </article>
        ))}

      <NewCommentForm postId={post.id} onAdd={handleAddComment} />
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

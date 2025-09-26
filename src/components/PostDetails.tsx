import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const COMMENTS_KEY = `comments-${post.id}`;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COMMENTS_KEY);

    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      setIsLoading(true);
      setError(false);

      client
        .get<Comment[]>(`/comments?postId=${post.id}`)
        .then(data => {
          setComments(data);
          localStorage.setItem(COMMENTS_KEY, JSON.stringify(data));
        })
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }

    setShowForm(false);
  }, [post.id]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    }
  }, [comments]);

  const handleDeleteComment = async (comment: Comment) => {
    try {
      await client.delete(`/comments/${comment.id}`);

      setComments(prev => prev.filter(com => com.id !== comment.id));
    } catch (err) {
      alert('Could not delete comment. Please try again.');
    }
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
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
                    onClick={() => handleDeleteComment(comment)}
                  />
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoading && !error && (
          <>
            {!showForm && (
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
              <NewCommentForm postId={post.id} onAdd={handleAddComment} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

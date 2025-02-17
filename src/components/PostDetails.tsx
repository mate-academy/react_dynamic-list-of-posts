/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface PostDetailsProps {
  post: Post | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setLoading(true);
    setError(null);
    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(data => setComments(data))
      .catch(() => setError('Failed to load comments'))
      .finally(() => setLoading(false));
  }, [post]);

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    client.delete(`/comments/${commentId}`).catch(err => {
      console.error('Failed to delete comment', err);
    });
  };

  useEffect(() => {
    setShowCommentForm(false);
  }, [post]);

  const handleCommentSubmit = async (commentData: {
    name: string;
    email: string;
    body: string;
  }) => {
    if (!post) {
      return;
    }

    try {
      const newComment = await client.post<Comment>('/comments', {
        ...commentData,
        postId: post.id,
      });

      setComments(prev => [...prev, newComment]);

      return newComment;
    } catch (err) {
      throw err;
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}
        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}
        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!loading && !error && comments.length > 0 && (
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
                    type="button"
                    data-cy="CommentDelete"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loading && !error && !showCommentForm && (
          <button
            type="button"
            data-cy="WriteCommentButton"
            className="button is-link"
            onClick={() => setShowCommentForm(true)}
          >
            Write a comment
          </button>
        )}

        {showCommentForm && <NewCommentForm onSubmit={handleCommentSubmit} />}
      </div>
    </div>
  );
};

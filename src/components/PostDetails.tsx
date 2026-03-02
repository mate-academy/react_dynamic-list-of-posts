import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setComments(null);
    setShowForm(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [post]);

  const handleDelete = (id: number) => {
    // reset error and optimistic update with rollback on failure
    setError(false);
    const prev = comments;

    setComments(previousComments =>
      previousComments
        ? previousComments.filter(c => c.id !== id)
        : previousComments,
    );

    client.delete(`/comments/${id}`).catch(() => {
      // restore previous comments and show error notification
      setComments(prev);
      setError(true);
    });
  };

  const handleAdd = (data: CommentData) => {
    // reset error for a fresh attempt
    setError(false);
    setSubmitting(true);

    client
      .post<Comment>('/comments', { postId: post.id, ...data })
      .then(created => {
        setComments(prev => (prev ? [...prev, created] : [created]));
      })
      .catch(() => {
        // show error notification when adding comment fails
        setError(true);
      })
      .finally(() => setSubmitting(false));
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="title is-4">Comments:</p>

            {comments &&
              comments.map(c => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={c.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${c.email}`} data-cy="CommentAuthor">
                      {c.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDelete(c.id)}
                    />
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {c.body}
                  </div>
                </article>
              ))}

            <div>
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
                <NewCommentForm
                  initialName=""
                  initialEmail=""
                  submitting={submitting}
                  onSubmit={handleAdd}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

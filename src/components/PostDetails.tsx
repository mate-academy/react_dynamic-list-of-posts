import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setShowForm(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [post.id]);

  const handleDelete = (commentId: number) => {
    const backup = [...comments];

    setComments(curr => curr.filter(c => c.id !== commentId));

    client.delete(`/comments/${commentId}`).catch(() => {
      setComments(backup);
      alert('Failed to delete comment, bro. Try again!');
    });
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(curr => [...curr, newComment]);
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
        {loading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && <p className="title is-4">Comments:</p>}

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
                onClick={() => handleDelete(comment.id)}
              >
                delete
              </button>
            </div>
            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

        {!showForm && !loading && !error && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && <NewCommentForm postId={post.id} onAdd={handleAddComment} />}
    </div>
  );
};

import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type Props = {
  comments: Comment[];
  post: Post | null;
  error?: boolean;
  loading?: boolean;
  deleteCommentById: (id: number) => void;
  addComment?: (comment: CommentData) => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  post,
  error,
  loading,
  deleteCommentById,
  addComment,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleWriteComment = () => {
    setShowForm(true);
  };

  React.useEffect(() => {
    if (post) {
      setShowForm(false);
    }
  }, [post]);

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
            Something went wrong
          </div>
        )}

        {comments.length === 0 && !loading && !error && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && !loading && !error && (
          <p className="title is-4">Comments:</p>
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
                className="delete is-small"
                aria-label="delete"
                onClick={() => deleteCommentById(comment.id)}
              >
                delete button
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
            onClick={handleWriteComment}
          >
            Write a comment
          </button>
        )}

        {showForm && <NewCommentForm onAddComment={addComment} />}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
  comments: Comment[];
  loadingComments: boolean;
  commentsError: boolean;
  onAddComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  loadingComments,
  commentsError,
  onAddComment,
  onDeleteComment,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [deleteError, setDeleteError] = useState<number | null>(null);

  useEffect(() => {
    setShowForm(false);
    setDeleteError(null);
  }, [post.id]);

  const handleDeleteComment = (commentId: number, comment: Comment) => {
    // Optimistic update
    onDeleteComment(commentId);
    setDeleteError(null);

    // Try to delete on server
    client.delete(`/comments/${commentId}`).catch(() => {
      // Rollback on error
      onAddComment(comment);
      setDeleteError(commentId);
    });
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
        {loadingComments && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loadingComments && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loadingComments && !commentsError && comments.length > 0 && (
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
                    onClick={() => handleDeleteComment(comment.id, comment)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>

                {deleteError === comment.id && (
                  <div className="notification is-danger is-light">
                    Failed to delete comment. Please try again.
                  </div>
                )}
              </article>
            ))}
          </>
        )}

        {!loadingComments && !commentsError && !showForm && (
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
          <NewCommentForm postId={post.id} onCommentAdded={onAddComment} />
        )}
      </div>
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
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      postId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  loadingComments: PropTypes.bool.isRequired,
  commentsError: PropTypes.bool.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

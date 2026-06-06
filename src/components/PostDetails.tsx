import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { getPostComments, deleteComment } from '../api/postComments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsFormVisible(false);
    setDeleteError(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    const previousComments = comments;

    setComments(prev => prev.filter(c => c.id !== commentId));
    setDeleteError(false);

    deleteComment(commentId).catch(() => {
      setComments(previousComments);
      setDeleteError(true);
    });
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

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {deleteError && (
              <div className="notification is-danger">
                Unable to delete a comment. Please try again.
              </div>
            )}

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
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoading && !hasError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && isFormVisible && (
          <NewCommentForm postId={post.id} onAddComment={handleAddComment} />
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
};

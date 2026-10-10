import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/commentService';
import { Loader } from './Loader';
import { CommentsList } from './CommentsList';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);
    setDeleteError('');
    setComments([]);

    getPostComments(post.id)
      .then(loadedComments => {
        if (!cancelled) {
          setComments(loadedComments);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [post.id]);

  const handleAddComment = async (data: CommentData) => {
    const newComment = await createComment(post.id, data);

    setComments(currentComments => [...currentComments, newComment]);
  };

  const handleDeleteComment = (comment: Comment) => {
    const originalIndex = comments.findIndex(item => item.id === comment.id);

    setDeleteError('');
    setComments(currentComments =>
      currentComments.filter(item => item.id !== comment.id),
    );

    deleteComment(comment.id).catch(() => {
      setDeleteError('Unable to delete a comment');

      setComments(currentComments => {
        if (currentComments.some(item => item.id === comment.id)) {
          return currentComments;
        }

        const restoredComments = [...currentComments];

        restoredComments.splice(originalIndex, 0, comment);

        return restoredComments;
      });
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
        {deleteError && (
          <div className="notification is-danger">{deleteError}</div>
        )}

        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && (
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <CommentsList
                comments={comments}
                onDelete={handleDeleteComment}
              />
            )}

            {!isFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {isFormVisible && <NewCommentForm onSubmit={handleAddComment} />}
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

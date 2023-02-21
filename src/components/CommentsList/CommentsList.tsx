import React, { useCallback, useEffect, useState } from 'react';
import {
  addComment,
  deleteComment,
  getCommentsByPostId,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

type Props = {
  postId: number,
};

export const CommentsList: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getPostComments = async () => {
    try {
      setIsLoading(true);
      const allComments = await getCommentsByPostId(postId);

      setComments(allComments);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostComments();

    return () => {
      setIsFormVisible(false);
    };
  }, [postId]);

  const handleAddComment = useCallback(async (comment: CommentData) => {
    const newComment = {
      postId,
      ...comment,
    };

    try {
      const addedComment = await addComment(newComment);

      setComments(currentComments => [...currentComments, addedComment]);
    } catch (error) {
      setHasError(true);
      throw Error('Unable to add comment');
    }
  }, []);

  const handleDeleteComment = async (commentId: number) => {
    const tempComments = [...comments];

    setComments(prevComments => prevComments
      .filter(comment => comment.id !== commentId));

    try {
      await deleteComment(commentId);
    } catch (error) {
      setHasError(true);
      setComments(tempComments);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="block">
      {!comments.length
        ? (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )
        : (
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
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}
      {!isFormVisible
        ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )
        : (
          <NewCommentForm onAddComment={handleAddComment} />
        )}
    </div>
  );
};

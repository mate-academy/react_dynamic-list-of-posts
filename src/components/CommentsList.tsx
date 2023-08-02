import React, { useCallback, useEffect, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getComments, postComment } from '../api/comments';

type Props = {
  postId: number;
};

export const CommentsList: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [isFormVisible, setIsFormVisible] = useState(false);

  const addNewComment = useCallback(async (comment: CommentData) => {
    const newComment = { ...comment, postId };

    try {
      const addedComment = await postComment(newComment);

      setComments(currentComment => [...currentComment, addedComment]);
    } catch {
      setError('Can\'t add new comment');
    }
  }, []);

  const deleteSelectedComment = useCallback(async (commentId: number) => {
    const tempComments = [...comments];

    setComments(currentComments => (
      currentComments.filter(comment => comment.id !== commentId)
    ));

    try {
      setError('');
      await deleteComment(commentId);
    } catch {
      setComments(tempComments);
      setError('Can\'t delete comment');
    }
  }, []);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        setComments([]);
        setIsFormVisible(false);
        setError('');
        setIsLoading(true);
        const commentsFromServer = await getComments(postId);

        setComments(commentsFromServer);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostComments();
  }, [postId]);

  useEffect(() => {
    const errorTimer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(errorTimer);
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        {error}
      </div>
    );
  }

  return (
    <>
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
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a
                    href={`mailto:${comment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteSelectedComment(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

      {error && (
        <div
          className="notification is-danger"
          data-cy="CommentsError"
        >
          {error}
        </div>
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
        : <NewCommentForm onAddComment={addNewComment} />}
    </>
  );
};

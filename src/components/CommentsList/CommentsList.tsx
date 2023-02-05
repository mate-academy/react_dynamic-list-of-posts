import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Comment, CommentData } from '../../types';
import {
  deleteCommentById,
  getCommentsByPostId,
  postComment,
} from '../../api';
import { NewCommentForm } from '../NewCommentForm';

type Props = {
  postId: number,
};

export const CommentsList: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByPostId(postId)
      .then(postComments => {
        // setHasLoadedData(true);
        setComments(postComments);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [postId]);

  useEffect(() => setIsFormVisible(false), [postId]);

  const handleDeleteComment = (commentId: number) => {
    const preDeleteComments = [...comments];

    setComments(prev => (
      prev.filter(comment => comment.id !== commentId)
    ));
    deleteCommentById(commentId)
      .catch(() => {
        setComments(preDeleteComments);
      });
  };

  const handlePostComment = (commentData: CommentData) => {
    const newComment = {
      id: 0,
      postId,
      ...commentData,
    };

    return postComment(newComment)
      .then(postedComment => {
        setComments(prev => [...prev, postedComment]);
      });
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
        ) : (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(({
              id,
              name,
              email,
              body,
            }) => (
              <article
                key={id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            ))}
          </>
        )}

      {isFormVisible
        ? (
          <NewCommentForm
            onAdd={handlePostComment}
          />
        ) : (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
    </div>
  );
};

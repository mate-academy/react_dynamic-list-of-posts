import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PostsContext } from '../store/PostsContext';
import { CommentsList } from './CommentsList';
import { CommentsContext } from '../store/CommentsContext';
import { getComments } from '../api/comments';
import { ErrorType } from '../types/ErrorType';
import { NewCommentForm } from './NewCommentForm';

export const CommentBlock: React.FC = () => {
  const { selectedPost } = useContext(PostsContext);
  const { comments, setComments } = useContext(CommentsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.none);
  const [newCommentFormOpen, setNewCommentFormOpen] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setErrorMessage(ErrorType.none);
      setIsLoading(true);
      setNewCommentFormOpen(false);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setErrorMessage(ErrorType.loadComments))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost?.id]);

  return (
    <>
      <div className="block">
        {isLoading && <Loader />}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {!errorMessage && !isLoading && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!errorMessage && !isLoading && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            <CommentsList />
          </>
        )}

        {!newCommentFormOpen && !isLoading && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setNewCommentFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!errorMessage && !isLoading && newCommentFormOpen && <NewCommentForm />}
    </>
  );
};

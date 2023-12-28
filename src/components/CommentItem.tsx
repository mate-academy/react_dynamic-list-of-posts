import React, { useContext, useState } from 'react';
import { Comment } from '../types/Comment';
import { CommentsContext } from '../store/CommentsContext';
import { Loader } from './Loader';
import { ErrorType } from '../types/ErrorType';
import { ErrorNotification } from './ErrorNotification';

interface Props {
  comment: Comment,
}

export const CommentItem: React.FC<Props> = ({
  comment: {
    id,
    name,
    email,
    body,
  },
}) => {
  const { deleteComment } = useContext(CommentsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.none);

  const handleDelete = () => {
    if (deleteComment) {
      setIsLoading(true);

      deleteComment(id)
        .catch(() => setErrorMessage(ErrorType.deleteComment))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    isLoading
      ? (<Loader />)
      : (
        <article className="message is-small my-comment" data-cy="Comment">
          {errorMessage && (
            <ErrorNotification
              error={errorMessage}
              setError={setErrorMessage}
            />
          )}

          <div className="message-header">
            <a href={`mailto:${email}`} data-cy="CommentAuthor">
              {name}
            </a>

            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={handleDelete}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {body}
          </div>
        </article>
      )
  );
};

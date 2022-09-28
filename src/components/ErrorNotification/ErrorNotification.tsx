import React from 'react';
import { switchError } from '../../utils/switchError';
import { Error, ErrorElement } from '../../types/Error';
import { Post } from '../../types/Post';

type Props = {
  error: Error | null;
  element: ErrorElement;
  posts?: Post[];
  selectedUser?: number | null;
};

export const ErrorNotification: React.FC<Props> = ({
  element,
  error,
  posts,
  selectedUser,
}) => {
  const handleNotification = (type: Error) => {
    return switchError(
      type, error, element, posts, selectedUser,
    );
  };

  return (
    <>
      {handleNotification(Error.NO_POSTS) && (
        <div
          className="notification is-warning"
          data-cy="NoPostsYet"
        >
          {error}
        </div>
      )}

      {handleNotification(Error.GET_POSTS) && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          {error}
        </div>
      )}

      {handleNotification(Error.GET_USERS) && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          {error}
        </div>
      )}

      {handleNotification(Error.GET_COMMENTS) && (
        <div
          className="notification is-danger"
          data-cy="CommentsError"
        >
          {error}
        </div>
      )}

      {handleNotification(Error.ADD_COMMENT) && (
        <div
          className="notification is-danger"
          data-cy="CommentsError"
        >
          {error}
        </div>
      )}

      {handleNotification(Error.DELETE_COMMENT) && (
        <div
          className="notification is-danger"
          data-cy="CommentsError"
        >
          {error}
        </div>
      )}
    </>
  );
};

import React from 'react';
import { switchError } from '../../utils/switchError';
import {
  Error,
  ErrorElement,
  ErrorType,
  ErrorStyle,
} from '../../types/Error';
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
  const notification = (type: ErrorType) => {
    const errorStyle: ErrorStyle = (type === 'NoPostsYet')
      ? 'is-warning'
      : 'is-danger';

    return (
      <div
        className={`notification ${errorStyle}`}
        data-cy={type}
      >
        {error}
      </div>
    );
  };

  const handleNotification = (type: Error) => {
    return switchError(
      type, error, element, posts, selectedUser,
    );
  };

  return (
    <>
      {handleNotification(Error.NO_POSTS)
        && notification('NoPostsYet')}

      {handleNotification(Error.GET_POSTS)
        && notification('PostsLoadingError')}

      {handleNotification(Error.GET_USERS)
        && notification('PostsLoadingError')}

      {handleNotification(Error.GET_COMMENTS)
        && notification('CommentsError')}

      {handleNotification(Error.ADD_COMMENT)
        && notification('CommentsError')}

      {handleNotification(Error.DELETE_COMMENT)
        && notification('CommentsError')}
    </>
  );
};

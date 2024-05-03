import React from 'react';
import cn from 'classnames';
import { Error, Warning } from '../types/Notification';

interface Props {
  type: 'error' | 'warning';
  message: Error | Warning;
}

export const Notification: React.FC<Props> = ({ type, message }) => {
  const notificationClass = cn(
    message === Warning.NoComment ? 'title' : 'notification',
    {
      'is-danger': type === 'error',
      'is-warning': type === 'warning' && message === Warning.NoPost,
      'is-4': type === 'warning' && message === Warning.NoComment,
    },
  );

  const dataCy =
    type === 'error' && message === Error.PostsError
      ? 'PostsLoadingError'
      : type === 'error' && message === Error.CommentsError
        ? 'CommentsError'
        : type === 'warning' && message === Warning.NoPost
          ? 'NoPostsYet'
          : 'NoCommentsMessage';

  return (
    <div className={notificationClass} data-cy={dataCy}>
      {message}
    </div>
  );
};

import React from 'react';
import cn from 'classnames';
import { Error, Warning } from '../types/Notification';

interface Props {
  type: 'error' | 'warning';
  message: Error | Warning;
}

export const Notification: React.FC<Props> = ({ type, message }) => {
  const notificationClass = cn('notification', {
    'is-danger': type === 'error',
    'is-warning': type === 'warning',
  });

  const dataCy =
    type === 'error' && message === Error.PostsError
      ? 'PostsLoadingError'
      : type === 'error' && message === Error.CommentsError
        ? 'CommentsError'
        : 'NoPostsYet';

  return (
    <div className={notificationClass} data-cy={dataCy}>
      {message}
    </div>
  );
};

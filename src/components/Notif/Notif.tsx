import classNames from 'classnames';
import React, { useContext } from 'react';
import { NotificationContent } from '../../Context/NotificationManager';

export const Notif: React.FC = () => {
  const { notificationState } = useContext(NotificationContent);

  return (
    <>
      {notificationState.error.length > 0 && (
        <div
          className="notification is-danger"
          data-cy={
            notificationState.source === 'Userloading'
              ? 'PostsLoadingError'
              : notificationState.source === 'PostDetails'
                ? 'CommentsError'
                : ''
          }
        >
          {notificationState.error}
        </div>
      )}

      {notificationState.alarm.length > 0 && (
        <div
          className={classNames({
            'title is-4': notificationState.source === 'PostDetails',
            'notification is-warning':
              notificationState.source === 'Userloading',
          })}
          data-cy={
            notificationState.source === 'Userloading'
              ? 'NoPostsYet'
              : notificationState.source === 'PostDetails'
                ? 'NoCommentsMessage'
                : ''
          }
        >
          {notificationState.alarm}
        </div>
      )}
    </>
  );
};

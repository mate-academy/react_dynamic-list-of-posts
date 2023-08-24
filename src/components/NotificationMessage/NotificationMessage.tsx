/* eslint-disable no-lone-blocks */
import React from 'react';
import cn from 'classnames';

import { Notification } from '../../types/Notification';

type Props = {
  data: Notification;
};

export const NotificationMessage: React.FC<Props> = ({
  data: {
    typeNotification,
    text,
    dataCypress,
  },
}) => (
  <div
    className={cn(
      'notification',
      {
        'is-warning': typeNotification === 'warning',
        'is-danger': typeNotification === 'danger',
      },
    )}
    data-cy={dataCypress}
  >
    {text}
  </div>
);

{
  /*
    <div
      className="notification is-danger"
      data-cy="PostsLoadingError"
    >
      Something went wrong!
    </div>

    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  */
}

import React from 'react';
import { Notification } from '../../types/Notification';

type Props = {
  notification: Notification;
  errorType: string,
  data: string,
};

export const NotificationMessage: React.FC<Props> = ({
  notification,
  errorType,
  data,
}) => (
  <div
    className={`notification ${errorType}`}
    data-cy={data}
  >
    {notification}
  </div>
);

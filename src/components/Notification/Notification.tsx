import { FC } from 'react';
import { NotificationProps } from '../../types';

export const Notification: FC<NotificationProps> = ({
  type = 'warning',
  text,
  dataCy,
}) => (
  <div
    className={`notification is-${type}`}
    data-cy={dataCy}
  >
    {text}
  </div>
);

import React, { useContext } from 'react';
import classNames from 'classnames';
import { StateContext } from '../../reducer/store';

export const Notifications: React.FC = () => {
  const {
    notificationMessage,
    notificationType,
    notificationData,
  } = useContext(StateContext);

  return (
    <div
      className={classNames(`notification ${notificationType}`)}
      data-cy={notificationData}
    >
      {notificationMessage}
    </div>
  );
};

import React, { useContext } from 'react';
import classNames from 'classnames';

import { Notifications } from '../../libs/enums';
import { StateContext } from '../../store';

type Props = {
  type?: Notifications,
  dataCy?: string,
  message?: string,
};

export const NotificationBlock: React.FC<Props> = ({
  type = Notifications.Danger,
  dataCy,
  message,
}) => {
  const {
    common: { errorMessage },
  } = useContext(StateContext);

  const notification = message || errorMessage;

  return (
    <>
      {notification && (
        <div
          className={classNames('notification', type)}
          data-cy={dataCy}
        >
          {notification}
        </div>
      )}
    </>
  );
};

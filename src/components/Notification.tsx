import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  isDanger?: boolean,
  isWarning?: boolean,
  message: string,
  setErrorMessage?: (error: string) => void,
};

export const Notification: React.FC<Props> = ({
  isDanger,
  isWarning,
  message,
  setErrorMessage,
}) => {
  useEffect(() => {
    if (isDanger && setErrorMessage) {
      setTimeout(() => setErrorMessage(''), 5000);
    }
  }, []);

  return (
    <div
      className={classNames('notification', {
        'is-danger': isDanger,
        'is-warning': isWarning,
      })}
      data-cy="PostsLoadingError"
    >
      {message}
    </div>
  );
};

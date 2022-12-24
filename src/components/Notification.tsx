import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Error } from '../types/Error';

type Props = {
  error: Error,
  setError?: (error: Error | null) => void,
};

export const Notification: React.FC<Props> = ({
  error,
  setError,
}) => {
  const {
    message,
    type,
    isDanger,
    isWarning,
  } = error;

  useEffect(() => {
    if (isDanger && setError) {
      setTimeout(() => setError(null), 5000);
    }
  }, []);

  return (
    <div
      className={classNames('notification', {
        'is-danger': isDanger,
        'is-warning': isWarning,
      })}
      data-cy={type}
    >
      {message}
    </div>
  );
};

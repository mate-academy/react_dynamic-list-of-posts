import React from 'react';
import { switchError } from '../../utils/switchError';
import { Error, ErrorStyle } from '../../types/Error';

type Props = {
  error: Error | null;
};

export const ErrorNotification: React.FC<Props> = ({ error }) => {
  const handleNotification = (type: Error) => {
    const errorType = switchError(type);

    const errorStyle: ErrorStyle = (errorType === 'NoPostsYet')
      ? 'is-warning'
      : 'is-danger';

    return (
      <div
        className={`notification ${errorStyle}`}
        data-cy={errorType}
      >
        {error}
      </div>
    );
  };

  return (
    <>
      {error
        && handleNotification(error)}
    </>
  );
};

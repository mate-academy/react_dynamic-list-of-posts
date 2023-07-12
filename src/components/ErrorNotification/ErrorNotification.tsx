import React from 'react';
import classNames from 'classnames';
import { switchError } from '../../utils/switchError';
import { Error } from '../../types/Error';

type Props = {
  error: Error | null;
};

export const ErrorNotification: React.FC<Props> = ({ error }) => {
  const errorType = !error
    ? null
    : switchError(error);

  return (
    <div
      className={classNames(
        'notification',
        { 'is-warning': errorType === 'NoPostsYet' },
        { 'is-danger': errorType !== 'NoPostsYet' },
      )}
      data-cy={errorType}
    >
      {error}
    </div>
  );
};

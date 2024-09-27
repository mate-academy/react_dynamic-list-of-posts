import React, { memo } from 'react';

type Props = {
  errorMessage: string;
};

export const ErrorNotification: React.FC<Props> = memo(
  function ErrorNotification({ errorMessage }) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        {errorMessage}
      </div>
    );
  },
);

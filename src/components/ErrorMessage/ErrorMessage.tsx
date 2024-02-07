import React from 'react';

interface Props {
  errorMessage: string,
}

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => (
  <div
    className="notification is-danger"
    data-cy="PostsLoadingError"
  >
    {errorMessage}
  </div>
);

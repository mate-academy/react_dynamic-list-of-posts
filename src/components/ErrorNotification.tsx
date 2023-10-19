import React from 'react';

export const ErrorNotification: React.FC = () => {
  return (
    <div
      className="notification is-danger"
      data-cy="PostsLoadingError"
    >
      Something went wrong!
    </div>
  );
};

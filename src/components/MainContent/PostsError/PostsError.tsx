import React from 'react';

export const PostsError: React.FC = () => {
  return (
    <div
      className="notification is-danger"
      data-cy="PostsLoadingError"
    >
      Something went wrong!
    </div>
  );
};

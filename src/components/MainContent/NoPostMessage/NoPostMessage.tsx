import React from 'react';

export const NoPostMessage: React.FC = () => {
  return (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );
};

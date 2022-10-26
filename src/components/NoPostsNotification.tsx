import React from 'react';

export const NoPostsNotification: React.FC = React.memo(() => {
  return (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );
});

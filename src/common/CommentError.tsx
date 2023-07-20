import React from 'react';

export const CommentError: React.FC = () => {
  return (
    <div className="notification is-danger" data-cy="CommentsError">
      Something went wrong!
    </div>
  );
};

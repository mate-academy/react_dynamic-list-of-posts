import React from 'react';

type CommentsErrorProps = {
  message: string;
};

export const CommentsError: React.FC<CommentsErrorProps> = ({ message }) => (
  <div
    className="notification is-danger comments-error"
    data-cy="CommentsError"
  >
    <p>{message}</p>
  </div>
);

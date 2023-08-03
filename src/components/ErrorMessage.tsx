import React from 'react';

const ErrorMessage:React.FC = () => {
  return (
    <div
      className="notification is-danger"
      data-cy="PostsLoadingError"
    >
      Something went wrong!
    </div>
  );
};

export default ErrorMessage;

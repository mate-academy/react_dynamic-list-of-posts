import React from 'react';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <>
      {message && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {message}
        </p>
      )}
    </>
  );
};

export default ErrorMessage;

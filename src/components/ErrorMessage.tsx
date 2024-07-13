import React from 'react';

type ErrorMessageProps = {
  message: string;
  showError: boolean;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  showError,
}) => {
  if (!showError) {
    return null;
  }

  return (
    <p className="help is-danger" data-cy="ErrorMessage">
      {message}
    </p>
  );
};

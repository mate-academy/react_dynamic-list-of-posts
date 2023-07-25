import React, { useEffect } from 'react';

type Props = {
  error: string;
  setError: (value: string) => void;
};

export const ErrorsNotification: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, []);

  return (
    <div
      className="notification is-danger"
      data-cy="PostsLoadingError"
    >
      {error}
    </div>
  );
};

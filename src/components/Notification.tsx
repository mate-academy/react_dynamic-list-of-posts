import React from 'react';

type Props = {
  message: string;
  error?: boolean;
  dataCy?: string;
};

export const Notification: React.FC<Props> = ({
  message,
  error = false,
  dataCy = '',
}) => (
  <div
    className={`notification ${error ? 'is-danger' : 'is-warning'}`}
    data-cy={dataCy}
  >
    {message}
  </div>
);

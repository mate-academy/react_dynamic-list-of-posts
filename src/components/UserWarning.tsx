import React from 'react';

interface UserWarningProps {
  message: string;
  dataCy: string;
}

export const UserWarning: React.FC<UserWarningProps> = ({
  message,
  dataCy,
}) => (
  <div className="notification is-danger" data-cy={dataCy}>
    {message}
  </div>
);

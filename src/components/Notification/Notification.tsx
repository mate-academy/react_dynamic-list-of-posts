import React from 'react';
import { useValues } from '../../SharedContext';

type Props = {
  errorMessage: string;
  dataCy: string;
};

export const Notification: React.FC<Props> = ({ errorMessage, dataCy }) => {
  const { isError } = useValues();

  return (
    <div
      className={`notification ${isError ? 'is-danger' : 'is-warning'}`}
      data-cy={dataCy}
    >
      {errorMessage}
    </div>
  );
};

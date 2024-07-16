import React from 'react';
import { ErrorsDataCy } from '../types/ErrorsDataCy';

interface Props {
  dataCy: ErrorsDataCy;
}

export const Errors: React.FC<Props> = ({ dataCy }) => {
  return (
    <div className="notification is-danger" data-cy={dataCy}>
      Something went wrong!
    </div>
  );
};

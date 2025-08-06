import React from 'react';

interface Props {
  dataCy?: string;
}

export const FormErrorIcon: React.FC<Props> = ({ dataCy = 'ErrorIcon' }) => (
  <span className="icon is-small is-right has-text-danger" data-cy={dataCy}>
    <i className="fas fa-exclamation-triangle" />
  </span>
);

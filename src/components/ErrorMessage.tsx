import React from 'react';

type Props = {
  title: string;
};

export const ErrorMessage: React.FC<Props> = ({ title }) => {
  return (
    <p className="help is-danger" data-cy="ErrorMessage">
      {title}
    </p>
  );
};

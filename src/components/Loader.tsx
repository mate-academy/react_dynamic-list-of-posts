import React from 'react';

type LoaderProps = {
  'data-cy'?: string;
};

export const Loader: React.FC<LoaderProps> = ({ 'data-cy': dataCy }) => (
  <div className="has-text-centered" {...(dataCy ? { 'data-cy': dataCy } : {})}>
    <button className="button is-loading is-light is-large">Loading</button>
  </div>
);

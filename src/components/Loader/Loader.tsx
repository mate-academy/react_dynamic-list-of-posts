import React from 'react';
import './Loader.scss';

export const Loader: React.FC = React.memo(() => {
  return (
    <div className="Loader" data-cy="Loader">
      <div className="Loader__content" />
    </div>
  );
});

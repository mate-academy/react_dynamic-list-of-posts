import { memo } from 'react';
import './Loader.scss';

export const Loader = memo(() => (
  <div className="Loader" data-cy="Loader">
    <div className="Loader__content" />
  </div>
));

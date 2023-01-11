import { FC } from 'react';

import classes from './Loader.module.scss';

const Loader:FC = () => (
  <div className={classes.loader} data-cy="Loader">
    <div className={classes['loader-content']} />
  </div>
);

export default Loader;

import React, { FC } from 'react';
import Loader from 'react-loader-spinner';

export const LoaderContainer: FC = () => (
  <div className="loader">
    <Loader
      type="Hearts"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  </div>
);

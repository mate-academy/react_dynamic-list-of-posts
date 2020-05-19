import React from 'react';
import { LoadingSpinner } from '../loading-spinner';

type Props = {
  isLoading: boolean;
  handleLoad: () => void;
  errorMessage: string;
};

export const Button: React.FC<Props> = ({ isLoading, handleLoad, errorMessage }) => {
  return (
    <>
      {!isLoading
        ? (
          <button
            className="main__load-button"
            disabled={isLoading}
            type="button"
            onClick={handleLoad}
          >
            Load
          </button>
        )
        : <LoadingSpinner />}
      {errorMessage && <span className="error__message">{errorMessage}</span>}
    </>
  );
};

import React from 'react';
import './LoadingPage.css';

export const LoadingPage = ({ isLoading, hasError, getData }) => (
  <>
    {isLoading && (
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )}
    {hasError && (
    <>
      <h3>Something went wrong:(</h3>
      <button
        type="button"
        onClick={getData}
        className="btn btn-outline-dark">
            Try again
      </button>
    </>
    )}
  </>
);

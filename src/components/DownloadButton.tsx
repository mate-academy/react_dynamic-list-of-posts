import React from 'react';

interface Props {
  dataGeneration: () => void;
  isLoading: boolean;
}

export const DownloadButton: React.FC<Props> = ({ dataGeneration, isLoading }) => {
  return (
    <>
      <button
        type="button"
        onClick={dataGeneration}
        disabled={isLoading}
        className="loading-button"
      >
        Get posts
      </button>
      {isLoading && (
        <p className="loading-text">Loading... Please wait!</p>
      )}
    </>
  );
};

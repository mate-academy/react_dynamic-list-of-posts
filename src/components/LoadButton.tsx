import React, { FC } from 'react';

interface Props {
  loading: boolean;
  onLoadData: () => void;
}

const LoadButton: FC<Props> = ({ loading, onLoadData }) => {
  return (
    <button type="button" disabled={loading} onClick={onLoadData}>
      {loading ? 'Loading' : 'Load'}
    </button>
  );
};

export default LoadButton;

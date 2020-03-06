import React, { FC } from 'react';

interface Props {
  handleLoad: () => void;
}

export const LoadButton: FC<Props> = ({ handleLoad }) => (
  <>
    <button className="button" type="button" onClick={handleLoad}>Load posts</button>
  </>
);

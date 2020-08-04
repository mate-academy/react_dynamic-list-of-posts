import React, { FC } from 'react';

interface Props {
  onClick: () => void;
  content: string;
}

export const Button: FC<Props> = ({ content, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary"
    >
      {content}
    </button>
  );
};

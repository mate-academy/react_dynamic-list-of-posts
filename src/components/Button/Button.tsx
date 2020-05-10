import React from 'react';

interface Props {
  text: string;
  className: string;
  handleClick: () => void;
}

export const Button: React.FC<Props> = ({
  text,
  className,
  handleClick,
}) => (
  <button type="button" className={className} onClick={handleClick}>
    {text}
  </button>
);

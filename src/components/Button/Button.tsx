import React from 'react';
import './Button.css';

type Props = {
  handleOnClick: () => void;
  text: string;
};

const Button: React.FC<Props> = ({ handleOnClick, text }) => (
  <button
    type="button"
    className="button"
    onClick={handleOnClick}
  >
    {text}
  </button>
);

export default Button;

import React from 'react';
import { ButtonProps } from '../../constants/proptypes';

import './Button.css';

const Button = ({ text, listOfTodos, onClick }) => (
  <button
    className="btn btn-primary btn--start"
    type="button"
    onClick={() => onClick(listOfTodos)}
  >
    {text}
  </button>
);

Button.propTypes = ButtonProps;

export default Button;

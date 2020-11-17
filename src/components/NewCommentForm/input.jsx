import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ name, value, setState }) => (
  <input
    type="text"
    name={name}
    value={value}
    placeholder={`Your ${name}`}
    className="NewCommentForm__input"
    onChange={event => setState(event.target.value)}
  />
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

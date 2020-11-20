import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ name, placeholder, value, onChange }) => (
  <input
    type="text"
    name={name}
    placeholder={placeholder}
    className="NewCommentForm__input"
    value={value}
    onChange={onChange}
  />
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

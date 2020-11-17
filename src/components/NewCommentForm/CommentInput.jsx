import React from 'react';
import PropTypes from 'prop-types';
import { inputShapes } from '../shapes/inputShapes';

export const CommentInput = ({
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="form-field">
    <input
      type="text"
      name={name}
      value={value}
      onChange={event => onChange(event.target.value)}
      placeholder={placeholder}
      className="NewCommentForm__input"
      required
    />
  </div>
);

CommentInput.propTypes = PropTypes.shape(inputShapes).isRequired;

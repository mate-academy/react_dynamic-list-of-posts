import React from 'react';
import PropTypes from 'prop-types';
import { inputShapes } from '../shapes/inputShapes';

export const CommentTextarea = ({
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="form-field">
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={event => onChange(event.target.value)}
      className="NewCommentForm__input"
      required
    />
  </div>
);

CommentTextarea.propTypes = PropTypes.shape(inputShapes).isRequired;

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { inputShapes } from '../shapes/inputShapes';

export const CommentInput = ({
  name,
  value,
  onChange,
  placeholder,
}) => {
  const handleValue = useCallback(
    event => onChange(event.target.value),
    [],
  );

  return (
    <div className="form-field">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleValue}
        placeholder={placeholder}
        className="NewCommentForm__input"
        required
      />
    </div>
  );
};

CommentInput.propTypes = PropTypes.shape(inputShapes).isRequired;

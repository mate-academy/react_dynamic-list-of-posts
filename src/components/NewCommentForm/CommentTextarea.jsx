import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { inputShapes } from '../shapes/inputShapes';

export const CommentTextarea = ({
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
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleValue}
        className="NewCommentForm__input"
        required
      />
    </div>
  );
};

CommentTextarea.propTypes = PropTypes.shape(inputShapes).isRequired;

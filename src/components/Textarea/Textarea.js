import React from 'react';
import PropTypes from 'prop-types';

export const Textarea = ({ value, onChange }) => (
  <textarea
    name="body"
    placeholder="Type comment here"
    className="NewCommentForm__input"
    value={value}
    onChange={onChange}
  />
);

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

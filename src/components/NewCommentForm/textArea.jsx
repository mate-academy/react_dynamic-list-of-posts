import React from 'react';
import PropTypes from 'prop-types';

export const TextArea = ({ name, value, setState }) => (
  <textarea
    name={name}
    value={value}
    placeholder="Type comment here"
    className="NewCommentForm__input"
    onChange={event => setState(event.target.value)}
  />
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

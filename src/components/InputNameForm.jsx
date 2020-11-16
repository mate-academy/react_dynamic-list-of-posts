import React from 'react';
import PropTypes from 'prop-types';

export const InputNameForm = ({ handleName, name }) => (
  <div className="form-field">
    <input
      onChange={handleName}
      value={name}
      type="text"
      name="name"
      placeholder="Your name"
      className="NewCommentForm__input"
    />
  </div>
);

InputNameForm.propTypes = {
  handleName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}.isRequired;

import React from 'react';
import PropTypes from 'prop-types';

export const InputEmailForm = ({ handleEmail, email }) => (
  <div className="form-field">
    <input
      onChange={handleEmail}
      value={email}
      type="text"
      name="email"
      placeholder="Your email"
      className="NewCommentForm__input"
    />
  </div>
);

InputEmailForm.propTypes = {
  handleEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
}.isRequired;

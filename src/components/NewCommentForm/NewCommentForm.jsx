import React, { useState } from 'react';
import './NewCommentForm.scss';

import PropTypes from 'prop-types';

export const NewCommentForm = ({ onAdd }) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBody, setNewBody] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    onAdd(newName, newEmail, newBody);
    clearForm();
  };

  const clearForm = () => {
    setNewName('');
    setNewEmail('');
    setNewBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <input
          type="text"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newName}
          required
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newEmail}
          required
          onChange={({ target }) => setNewEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newBody}
          required
          onChange={({ target }) => setNewBody(target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

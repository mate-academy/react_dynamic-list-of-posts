import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onAdd }) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBody, setNewBody] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    onAdd(newName, newEmail, newBody);

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
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newName}
          onChange={event => setNewName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newEmail}
          onChange={event => setNewEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input NewCommentForm__input--textarea"
          value={newBody}
          onChange={event => setNewBody(event.target.value)}
          required
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onAdd }) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentBody, setNewCommentBody] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(newCommentName, newCommentEmail, newCommentBody);

        setNewCommentName('');
        setNewCommentEmail('');
        setNewCommentBody('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={newCommentName}
          onChange={(event) => {
            setNewCommentName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={newCommentEmail}
          onChange={(event) => {
            setNewCommentEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={newCommentBody}
          onChange={(event) => {
            setNewCommentBody(event.target.value);
          }}
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

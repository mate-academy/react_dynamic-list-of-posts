import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onAdd }) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentBody, setNewCommentBody] = useState('');

  const changeInputValue = (value, callback) => {
    callback(value);
  };

  const addNewComment = () => {
    onAdd(newCommentName, newCommentEmail, newCommentBody);

    setNewCommentName('');
    setNewCommentEmail('');
    setNewCommentBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addNewComment();
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
            changeInputValue(event.target.value, setNewCommentName);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={newCommentEmail}
          onChange={(event) => {
            changeInputValue(event.target.value, setNewCommentEmail);
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
            changeInputValue(event.target.value, setNewCommentBody);
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

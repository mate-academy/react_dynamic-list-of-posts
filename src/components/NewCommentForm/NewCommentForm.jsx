import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onAddComment }) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (!newName) {
      return;
    }

    if (!newEmail) {
      return;
    }

    if (!newComment) {
      return;
    }

    onAddComment(newName, newEmail, newComment);
    setNewName('');
    setNewEmail('');
    setNewComment('');
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={newEmail}
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
  onAddComment: PropTypes.func.isRequired,
};

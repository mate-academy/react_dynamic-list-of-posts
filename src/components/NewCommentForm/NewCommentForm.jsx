import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createPostComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId }) => {
  const [newName, setNewName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    createPostComment({
      postId,
      name: newName,
      email,
      body: text,
    });

    setNewName('');
    setEmail('');
    setText('');
  };

  const handleChange = (changeEvent, callback) => {
    callback(changeEvent.target.value);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newName}
          onChange={event => handleChange(event, setNewName)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => handleChange(event, setEmail)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={text}
          onChange={event => handleChange(event, setText)}
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
  postId: PropTypes.number.isRequired,
};

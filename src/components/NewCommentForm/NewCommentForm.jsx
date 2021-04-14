import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { createComment } from '../../api/api';

const { uuid } = require('uuidv4');

export const NewCommentForm = ({ selectedPostId, addComment }) => {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleInputChange = (event, callback) => {
    const { value } = event.target;

    callback(value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const newComment = {
      id: uuid(),
      postId: selectedPostId,
      name: userName,
      email,
      body,
    };

    await createComment(newComment);
    addComment(newComment);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={userName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => handleInputChange(event, setName)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => handleInputChange(event, setEmail)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => handleInputChange(event, setBody)}
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
  selectedPostId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

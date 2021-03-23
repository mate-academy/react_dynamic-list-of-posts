import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId }) => {
  const [newName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      postId,
      name: newName,
      email,
      body,
    };

    createComment(newComment);
    setName('');
    setEmail('');
    setBody('');
  };

  const handleChange = (event, callback) => {
    callback(event.target.value);
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
          onChange={event => handleChange(event, setName)}
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
          value={body}
          onChange={event => handleChange(event, setBody)}
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

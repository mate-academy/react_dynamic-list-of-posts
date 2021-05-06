import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { addPostComment } from '../../api/comments';

export const NewCommentForm = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleChange = (event, callback) => {
    callback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addPostComment({
      postId,
      name,
      email,
      body: text,
    });

    setName('');
    setEmail('');
    setText('');
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
          value={name}
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

import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';

export const NewCommentForm = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const formSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    addComment(newComment);

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
      onSubmit={formSubmit}
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
          alue={email}
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

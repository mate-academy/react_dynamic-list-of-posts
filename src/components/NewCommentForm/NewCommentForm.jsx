import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId }) => {
  const [body, setBody] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const sendComment = (event) => {
    event.preventDefault();

    createComment(postId, userName, email, body);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'body') {
      setBody(value);
    } else if (name === 'name') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={sendComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={userName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleChange}
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

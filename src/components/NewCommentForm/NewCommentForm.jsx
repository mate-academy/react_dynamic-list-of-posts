import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPostComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectPostId }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addPostComment({
      postId: selectPostId,
      name: userName,
      email,
      body,
    });

    setUserName('');
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
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
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
  selectPostId: PropTypes.number.isRequired,
};

import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';

export const NewCommentForm = ({ postId }) => {
  const [name, handleName] = useState('');
  const [email, handleEmail] = useState('');
  const [comment, handleComment] = useState('');

  const handleInput = (event) => {
    const inputName = event.target.name;
    const { value } = event.target;

    switch (inputName) {
      case 'name':
        handleName(value);
        break;

      case 'email':
        handleEmail(value);
        break;

      default:
        handleComment(value);
    }
  };

  const handleSubmit = (event) => {
    if (postId && name && email.includes('@') && comment) {
      event.preventDefault();
      addComment(postId, name, email, comment);

      handleName('');
      handleEmail('');
      handleComment('');
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name.trimLeft()}
          required
          onChange={(event) => {
            handleInput(event);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            handleInput(event);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={(event) => {
            handleInput(event);
          }}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(event) => {
          handleSubmit(event);
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.defaultProps = {
  postId: 0,
};

NewCommentForm.propTypes = {
  postId: PropTypes.number,
};

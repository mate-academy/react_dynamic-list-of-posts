import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, onRefreshDetails }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const setValue = (event, setter) => {
    setter(event.target.value);
  };

  const submitComment = (event) => {
    event.preventDefault();
    addComment({
      name,
      email,
      body,
      postId: selectedPostId,
    })
      .then(() => onRefreshDetails());
    resetForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setValue(event, setName);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setValue(event, setEmail);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setValue(event, setBody);
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
  selectedPostId: PropTypes.number.isRequired,
  onRefreshDetails: PropTypes.func.isRequired,
};

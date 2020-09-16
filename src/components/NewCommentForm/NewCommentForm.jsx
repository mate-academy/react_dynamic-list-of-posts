import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ getNewComment }) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    getNewComment(nameValue, emailValue, bodyValue);

    setNameValue('');
    setEmailValue('');
    setBodyValue('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameValue}
          onChange={event => setNameValue(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailValue}
          onChange={event => setEmailValue(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyValue}
          onChange={event => setBodyValue(event.target.value)}
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
  getNewComment: PropTypes.func.isRequired,
};

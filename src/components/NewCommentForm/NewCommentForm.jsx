import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addComment } from '../../api/comments';

import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, loadPostComments }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={async(event) => {
        event.preventDefault();

        const isEmptyFields = !nameInput || !emailInput || !bodyInput;

        if (isEmptyFields) {
          return;
        }

        await addComment(postId, {
          nameInput, emailInput, bodyInput,
        });

        await loadPostComments();

        setNameInput('');
        setEmailInput('');
        setBodyInput('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameInput}
          onChange={event => setNameInput(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailInput}
          onChange={event => setEmailInput(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyInput}
          onChange={event => setBodyInput(event.target.value)}
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
  loadPostComments: PropTypes.func.isRequired,
};

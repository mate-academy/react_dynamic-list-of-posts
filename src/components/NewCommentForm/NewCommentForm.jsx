import React, { useState } from 'react';
import './NewCommentForm.scss';

import { createComment } from '../../api/comments';

export const NewCommentForm = ({ selectedPostId }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        createComment({
            postId: selectedPostId,
            name: nameInput,
            email: emailInput,
            body: commentInput,
        });
        setNameInput('');
        setEmailInput('');
        setCommentInput('');
      }}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={nameInput}
          onChange={event => setNameInput(event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={emailInput}
          onChange={event => setEmailInput(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={commentInput}
          onChange={event => setCommentInput(event.target.value)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

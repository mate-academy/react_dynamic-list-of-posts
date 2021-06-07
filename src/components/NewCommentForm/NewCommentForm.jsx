import React, { useState } from 'react';

import './NewCommentForm.scss';

import { createComment } from '../../api/comments';

export const NewCommentForm = ({ selectedPostId, getUpdatedComments }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  const clearForm = () => {
    setNameInput('');
    setEmailInput('');
    setCommentInput('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={async event => {
        event.preventDefault();
        await createComment({
          postId: selectedPostId,
          name: nameInput,
          email: emailInput,
          body: commentInput,
        });
        clearForm();
        await getUpdatedComments();
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
          value={commentInput}
          onChange={event => setCommentInput(event.target.value)}
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

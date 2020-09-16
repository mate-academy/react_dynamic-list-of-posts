import React, { useState } from 'react';
import { addComment } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId }) => {
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [body, changeBody] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addComment(name, email, body, postId);
        changeName('');
        changeEmail('');
        changeBody('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={event => changeName(event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          onChange={event => changeEmail(event.target.value)}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          onChange={event => changeBody(event.target.value)}
          name="body"
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

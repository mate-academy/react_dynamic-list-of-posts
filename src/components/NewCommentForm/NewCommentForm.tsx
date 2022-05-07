import React, { useState } from 'react';
import './NewCommentForm.scss';
import { createComment } from '../../api/api';
import { Posts } from '../../types/types';

interface Props {
  post: Posts,
  resetComent: () => void
}

export const NewCommentForm: React.FC<Props> = ({ post, resetComent }) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        createComment(post.id, nameValue, emailValue, bodyValue);
        resetComent();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailValue}
          onChange={(event) => setEmailValue(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyValue}
          onChange={(event) => setBodyValue(event.target.value)}
          required
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

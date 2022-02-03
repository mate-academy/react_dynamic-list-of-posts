import React, { useState } from 'react';
import './NewCommentForm.scss';

export type NewComment = {
  name: string,
  email: string,
  body: string,
};

type Props = {
  setNewComment: (newComment: NewComment) => void,
};

export const NewCommentForm: React.FC<Props> = ({ setNewComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setName(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setBody(target.value);
          }}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={() => {
          setNewComment({ name, email, body });
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

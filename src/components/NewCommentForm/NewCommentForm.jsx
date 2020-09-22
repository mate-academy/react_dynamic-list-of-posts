import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

export const NewCommentForm = ({ selectedPostId }) => {
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
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={({ target }) => setBody(target.value)}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={() => {
          addComment(selectedPostId, name, email, body);
          setName('');
          setEmail('');
          setBody('');
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

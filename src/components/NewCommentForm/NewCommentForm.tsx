import React, { useState, useEffect } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

type Props = {
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const submitForm: React.FormEventHandler = (event) => {
    event.preventDefault();
    addComment({
      name,
      email,
      body,
      postId,
    });

    setName('');
    setEmail('');
    setBody('');
  };

  useEffect(() => {
    setName('');
    setEmail('');
    setBody('');
  }, [postId]);

  return (
    <form
      onSubmit={submitForm}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          value={name}
          onChange={event => setName(event.target.value)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          onChange={event => setBody(event.target.value)}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

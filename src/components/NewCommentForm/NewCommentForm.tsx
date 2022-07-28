import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  createComment: (
    name: string,
    email: string,
    body: string,
  ) => void,
};

export const NewCommentForm: React.FC<Props> = ({ createComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={event => setBody(event.target.value)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          createComment(name, email, body);
          setName('');
          setEmail('');
          setBody('');
        }}
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};

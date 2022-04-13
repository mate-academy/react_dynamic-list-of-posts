import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  create: (name: string, email: string, body: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({ create }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const disableButton = (): boolean => {
    if ((name === '') || (email === '') || (body === '')) {
      return true;
    }

    return false;
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button
        disabled={disableButton()}
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(e) => {
          e.preventDefault();
          create(name, email, body);
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

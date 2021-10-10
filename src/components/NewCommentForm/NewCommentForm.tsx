import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onCommentAdd: (name: string, email: string, body: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({ onCommentAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bodyMessage, SetBodyMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCommentAdd(name, email, bodyMessage);
    setName('');
    setEmail('');
    SetBodyMessage('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
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
          value={bodyMessage}
          onChange={event => SetBodyMessage(event.target.value)}
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

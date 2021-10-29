import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addComment: (name: string, email: string, body: string) => void
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    addComment(name, email, body);
    resetForm();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
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

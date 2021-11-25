import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onAdd: (name: string, email: string, comment: string) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onAdd }) => {
  const [nameQuery, setNameQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [commentQuery, setCommentQuery] = useState('');

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={nameQuery}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setNameQuery(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={emailQuery}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmailQuery(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={commentQuery}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setCommentQuery(event.target.value)}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={() => {
          onAdd(
            nameQuery,
            emailQuery,
            commentQuery,
          );
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

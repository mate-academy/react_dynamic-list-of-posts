import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addComment: (title: string, email: string, body: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBody, setNewBody] = useState('');

  const clearInput = () => {
    setNewName('');
    setNewEmail('');
    setNewBody('');
  };

  const handleSumbitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    addComment(newName, newEmail, newBody);
    clearInput();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSumbitForm}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newBody}
          onChange={(event) => setNewBody(event.target.value)}
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

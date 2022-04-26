import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addNewComment: (name: string, email: string, body: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userBody, setUserBody] = useState('');

  const clearForm = () => {
    setUserName('');
    setUserEmail('');
    setUserBody('');
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewComment(userName, userEmail, userBody);
    clearForm();
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
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={userBody}
          onChange={(event) => {
            setUserBody(event.target.value);
          }}
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

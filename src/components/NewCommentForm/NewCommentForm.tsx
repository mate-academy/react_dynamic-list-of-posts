import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onAddComment: (name: string, email: string, body: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'userName':
        setUserName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'body':
        setBody(value);
        break;

      default:
        throw new Error('Invalid input name');
    }
  };

  const clearInputs = () => {
    setUserName('');
    setEmail('');
    setBody('');
  };

  const addComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddComment(userName, email, body);
    clearInputs();
  };

  return (
    <form className="NewCommentForm" onSubmit={addComment}>
      <div className="form-field">
        <input
          type="text"
          name="userName"
          value={userName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleChange}
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

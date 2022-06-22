import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  setComment: React.Dispatch<React.SetStateAction<Comments[] | undefined>>
};

export const NewCommentForm: React.FC<Props> = ({ setComment }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  const addComment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (nameInput && emailInput && commentInput) {
      setComment((current) => current && [...current, {
        name: nameInput, email: emailInput, body: commentInput,
      }]);
      setNameInput('');
      setEmailInput('');
      setCommentInput('');
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          required
          value={nameInput}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => (
            setNameInput(event.target.value)
          )}
        />
      </div>

      <div className="form-field">
        <input
          value={emailInput}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          onChange={(event) => (
            setEmailInput(event.target.value)
          )}
        />
      </div>

      <div className="form-field">
        <textarea
          value={commentInput}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => (
            setCommentInput(event.target.value)
          )}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={addComment}
      >
        Add a comment
      </button>
    </form>
  );
};

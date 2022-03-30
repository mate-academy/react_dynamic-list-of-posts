import React, { useState, FormEvent } from 'react';
import './NewCommentForm.scss';

type Props = {
  addNewComment: (data: Partial<CommentInfo>) => void,
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment, postId }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [bodyTextArea, setBodyTextArea] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewComment({
      postId,
      name: nameInput,
      email: emailInput,
      body: bodyTextArea,
    });

    setNameInput('');
    setEmailInput('');
    setBodyTextArea('');
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
          required
          value={nameInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNameInput(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={emailInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmailInput(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={bodyTextArea}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setBodyTextArea(event.target.value);
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

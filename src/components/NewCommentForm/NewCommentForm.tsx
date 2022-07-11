/* eslint-disable max-len */
import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

interface Props {
  postId: number;
  onNewComment: (value: any) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onNewComment }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addComment({
      postId,
      name: nameInput,
      email: emailInput,
      body: textInput,
    });
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    onNewComment((prev: boolean) => !prev);
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameInput}
          onChange={handleName}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailInput}
          onChange={handleEmail}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={textInput}
          onChange={handleText}
        />
      </div>

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};

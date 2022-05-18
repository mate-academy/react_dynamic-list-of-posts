import React, { useState } from 'react';
import './NewCommentForm.scss';

type FormProps = {
  currentPostId: number;
  addNewComment: (
    event: React.FormEvent<HTMLFormElement>,
    currentPostId: number,
    commentUserName: string,
    commentEmail: string,
    commentText: string) => void;
};

export const NewCommentForm: React.FC <FormProps> = ({
  currentPostId,
  addNewComment,
}) => {
  const [commentUserName, setCommentUserName] = useState('');

  const [commentEmail, setCommentEmail] = useState('');

  const [commentText, setCommentText] = useState('');

  const nameInputUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentUserName(event.target.value);
  };

  const emailInputUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentEmail(event.target.value);
  };

  const textInputUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const resetCommentValues = () => {
    setCommentUserName('');
    setCommentEmail('');
    setCommentText('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        addNewComment(event, currentPostId, commentUserName,
          commentEmail, commentText);
        resetCommentValues();
      }}
    >
      <div className="form-field">
        <input
          value={commentUserName}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={nameInputUpdate}
          required
        />
      </div>

      <div className="form-field">
        <input
          value={commentEmail}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={emailInputUpdate}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          value={commentText}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={textInputUpdate}
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

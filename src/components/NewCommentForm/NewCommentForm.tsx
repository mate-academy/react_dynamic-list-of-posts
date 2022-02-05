import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onPostNewComment: (
    name: string,
    email: string,
    body: string,
  ) => void;
};

export const NewCommentForm: React.FC<Props> = ({ onPostNewComment }) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onPostNewComment(
      commentName,
      commentEmail,
      commentBody,
    );

    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={commentName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            setCommentName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={commentEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            setCommentEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={commentBody}
          className="NewCommentForm__input"
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(event) => {
          handleSubmitForm(event);
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

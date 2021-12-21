import React, { useState } from 'react';
import './NewCommentForm.scss';

type NewComment = {
  postId: number;
  body: string;
  name: string;
  email: string;
};

type Props = {
  postId: number,
  addPostComment: (comment: NewComment) => void
};

export const NewCommentForm: React.FC<Props> = ({ postId, addPostComment }) => {
  const [commentBody, setBody] = useState<string>('');
  const [commentName, setName] = useState<string>('');
  const [commentEmail, setEmail] = useState<string>('');
  const [errorMessage, setError] = useState<string>('');

  const isFormValid = () => {
    return commentBody.trim() && commentName.trim() && commentEmail.trim();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        if (isFormValid()) {
          addPostComment({
            postId,
            body: commentBody,
            name: commentName,
            email: commentEmail,
          });

          setBody('');
          setName('');
          setEmail('');
        } else {
          setError('Fill all fields');
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentEmail}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      {!isFormValid() && (
        <p>{errorMessage}</p>
      )}

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};

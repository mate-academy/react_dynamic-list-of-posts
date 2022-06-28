/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';
import './NewCommentForm.scss';
import { createComment } from '../../api/api';

type Props = {
  postId: number;
  onAdd: () => void;
};

export const NewCommentForm: React.FC <Props> = ({ postId, onAdd }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  return (
    <form
      className="NewCommentForm"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        createComment({
          postId,
          name: userName,
          email: userEmail,
          body: commentBody,
        });
        setUserName('');
        setUserEmail('');
        setCommentBody('');
        onAdd();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          required
          className="NewCommentForm__input"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          required
          value={userEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          required
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
      >
        Add a comment
      </button>
    </form>
  );
};

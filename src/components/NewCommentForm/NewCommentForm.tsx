/* eslint-disable no-console */
import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  onAdded: () => void;
};

export const NewCommentForm: React.FC <Props> = ({ postId, onAdded }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const createComment = () => {
    fetch('https://mate.academy/students-api/comments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        postId,
        name: userName,
        email: userEmail,
        body: commentBody,
        createdAt: new Date(),
        updateddAt: new Date(),
      }),
    });
  };

  return (
    <form
      className="NewCommentForm"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        createComment();
        setUserName('');
        setUserEmail('');
        setCommentBody('');
        onAdded();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          className="NewCommentForm__input"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
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

/* eslint-disable no-console */
import React, { useState } from 'react';
import './NewCommentForm.scss';

import { PostCommentType } from '../../react-app-env';

type NewCommentFormType = {
  postId: number,
  postComments: (newComment: PostCommentType) => void,
};

export const NewCommentForm: React.FC<NewCommentFormType> = ({ postId, postComments }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');

  const addNewComment = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newComment = {
      id: +`${postId}${Date.toString}`,
      postId,
      name: userName,
      email: userEmail,
      body: userComment,
    };

    postComments(newComment);

    setUserName('');
    setUserEmail('');
    setUserComment('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={addNewComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
          minLength={4}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
          required
          minLength={6}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={userComment}
          onChange={(event) => setUserComment(event.target.value)}
          required
          minLength={6}
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

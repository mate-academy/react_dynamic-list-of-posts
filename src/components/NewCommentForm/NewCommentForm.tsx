/* eslint-disable no-console */
import React, { useState } from 'react';
import { submitComment } from '../../api/posts';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  updateComments: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, updateComments }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const { name, email, body } = comment;

  const resetState = () => {
    setComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = () => {
    const commentToSubmit = {
      postId,
      name,
      email,
      body,
    };

    submitComment(commentToSubmit);

    resetState();
    updateComments();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name: evName, value } = event.target;

    setComment({
      ...comment,
      [evName]: value,
    });
  };

  const allowSubmit = name.length > 0
    && email.length > 0
    && body.length > 0;

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        handleSubmit();
      }}
    >

      <div className="form-field">
        <input
          required
          type="email"
          name="email"
          placeholder="* Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => handleChange(event)}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          placeholder="* Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => handleChange(event)}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="* Comment body:"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => handleChange(event)}
        />
      </div>

      {allowSubmit && (
        <button
          type="submit"
          className="NewCommentForm__submit-button button"
        >
          ✅ Add a comment
        </button>
      )}
    </form>
  );
};

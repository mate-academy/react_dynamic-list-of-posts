/* eslint-disable no-console */
import React, { useState } from 'react';
import { submitComment } from '../../api/posts';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  updateComments: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, updateComments }) => {
  const [commentName, setName] = useState('');
  const [commentEmail, setEmail] = useState('');
  const [commentBody, setBody] = useState('');

  const resetState = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = () => {
    const comment = {
      postId,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    };

    submitComment(comment);

    resetState();
    updateComments();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        setBody(value);
    }
  };

  const preventSubmit = commentEmail.length === 0
    || commentName.length === 0
    || commentBody.length === 0;

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
          value={commentEmail}
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
          value={commentName}
          onChange={(event) => handleChange(event)}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="* Comment body:"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={(event) => handleChange(event)}
        />
      </div>

      {!preventSubmit && (
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

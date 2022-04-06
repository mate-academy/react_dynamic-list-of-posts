/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/Comment';

export const NewCommentForm: React.FC<Props> = ({ addComment, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setBody('');
    setName('');
    setEmail('');
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addComment({
      id: Math.trunc((Math.random() * Infinity) + Date.now()),
      name,
      email,
      body,
      postId,
      createdAt: new Date(),
    });
    reset();
  };

  return (
    <form className="NewCommentForm" onSubmit={submitHandler}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={changeHandler}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={changeHandler}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={body}
          onChange={changeHandler}
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

interface Props {
  addComment: (newComment: Comment) => void,
  postId: number,
}

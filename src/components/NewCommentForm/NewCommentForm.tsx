import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/Comment';

type Props = {
  postId: number,
  addNewComment: (comment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [body, setCommentBody] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addNewComment({
      name,
      email,
      body,
      postId,
    } as Comment);

    setUserName('');
    setUserEmail('');
    setCommentBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={name}
          onChange={event => setUserName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={email}
          onChange={event => setUserEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={body}
          onChange={event => setCommentBody(event.target.value)}
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

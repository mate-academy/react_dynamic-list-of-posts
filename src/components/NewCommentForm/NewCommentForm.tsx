import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  addComment: (
    event: React.FormEvent<HTMLFormElement>,
    comment: Comment
  ) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const newComment: Comment = {
    id: Math.round(Math.random() * 1000),
    name,
    email,
    body,
    postId,
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      onSubmit={(event) => {
        clearForm();
        addComment(event, newComment);
      }}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={5}
          cols={23}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

import React, { useState } from 'react';
import { getCommentAdd } from '../../api/comments';
import { NewComment } from '../../react-app-env';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  handleComment: (newComment: NewComment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, handleComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      id: postId + 1000,
      postId,
      name,
      email,
      body,
      createdAt: Date(),
      updatedAt: Date(),
    };

    getCommentAdd(newComment);
    handleComment(newComment);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
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
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
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

import React, { useState } from 'react';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';
import { Comment } from '../../types/Comment';

type Props = {
  postId: number;
  addComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const comment = {
    postId,
    name,
    email,
    body,
  };

  const clear = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const addCommentHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createComment(comment)
      .then(response => addComment(response));
    clear();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        addCommentHandler(event);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={body}
          onChange={event => setBody(event.target.value)}
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

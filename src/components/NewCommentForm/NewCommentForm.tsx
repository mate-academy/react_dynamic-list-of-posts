import React, { useState } from 'react';

import './NewCommentForm.scss';

import { Comment } from '../../types/comment';

type Props = {
  postId: number;
  addComment: (comment: Partial<Comment>) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const makeNewComment = () => {
    return {
      postId,
      name,
      email,
      body,
    };
  };

  const Submit: React.FormEventHandler = (event) => {
    event.preventDefault();

    const newComment = makeNewComment();

    addComment(newComment);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={Submit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          required
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          required
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          required
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

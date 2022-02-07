import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  addComment: (comment: Omit<PostComment, 'id'>) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    addComment({
      postId,
      name,
      email,
      body,
    });

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
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => setBody(event.target.value)}
          required
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

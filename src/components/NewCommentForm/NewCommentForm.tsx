import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addComment: (comment: Comment) => void
  postId: number
};

export const NewCommentForm: React.FC<Props> = ({ addComment, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    if (name.trim() && email.trim() && body.trim()) {
      addComment({
        postId,
        name,
        email,
        body,
      } as Comment);
    }

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
          onChange={event => setName(event.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => setEmail(event.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => setBody(event.currentTarget.value)}
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

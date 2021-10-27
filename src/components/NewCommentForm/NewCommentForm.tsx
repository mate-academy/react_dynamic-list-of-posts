import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onCommentAdd: (name: string, email: string, body: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({ onCommentAdd }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCommentAdd(comment.name, comment.email, comment.body);
    setComment({
      name: '',
      email: '',
      body: '',
    });
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
          value={comment.name}
          onChange={event => setComment(prevComment => ({
            name: event.target.value,
            email: prevComment.email,
            body: prevComment.body,
          }))}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>
      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          onChange={event => setComment(prevComment => ({
            name: prevComment.name,
            email: event.target.value,
            body: prevComment.body,
          }))}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>
      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          onChange={event => setComment(prevComment => ({
            name: prevComment.name,
            email: prevComment.email,
            body: event.target.value,
          }))}
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

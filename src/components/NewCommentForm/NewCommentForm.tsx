import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addComment: (name: string, email: string, body: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleChange = (event: HTMLInputElement | HTMLTextAreaElement) => {
    const { name, value } = event;

    setComment({
      ...comment,
      [name]: value,
    });
  };

  const { name, email, body } = comment;

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (name.length > 0 && email.length > 0 && body.length > 0) {
          addComment(name, email, body);
          setComment({
            name: '',
            email: '',
            body: '',
          });
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => handleChange(event.target)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => handleChange(event.target)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => handleChange(event.target)}
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

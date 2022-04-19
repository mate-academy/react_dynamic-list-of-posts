import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addNew: (
    name: string,
    email: string,
    comment: string
  ) => void;
};

export const NewCommentForm: React.FC<Props> = (({ addNew }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setComment('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNew(name, email, comment);
    resetForm();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          placeholder="Enter your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => (setName(event.target.value))}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          placeholder="Enter your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => (setEmail(event.target.value))}
        />
      </div>

      <div className="form-field">
        <textarea
          placeholder="Enter your comment"
          className="NewCommentForm__input"
          value={comment}
          onChange={(event) => (setComment(event.target.value))}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add your comment
      </button>
    </form>
  );
});

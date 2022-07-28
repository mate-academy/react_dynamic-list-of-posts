import React, { useState } from 'react';
import './NewCommentForm.scss';

interface NewCommentFormProps {
  onAddComment: (
    name: string,
    email: string,
    comment: string,
  ) => void;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = (
  { onAddComment },
) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearInputFields = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddComment(name, email, body);
    clearInputFields();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setBody(event.target.value)}
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

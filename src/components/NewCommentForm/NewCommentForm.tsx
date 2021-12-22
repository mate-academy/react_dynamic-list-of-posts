import React, { SyntheticEvent, useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  addComment: (name:string, email:string, body:string) => void,
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const submitComment = (event:SyntheticEvent) => {
    event.preventDefault();
    addComment(name, email, body);
  };

  const clearForm = () => {
    setBody('');
    setName('');
    setEmail('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        submitComment(event);
        clearForm();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

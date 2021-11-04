import React, { useState } from 'react';
import './NewCommentForm.scss';

type NewCommentFormProps = {
  addCommentFunc:(name: string, email: string, body: string) => void,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = (props) => {
  const { addCommentFunc } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addCommentFunc(name, email, comment);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => setComment(target.value)}
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

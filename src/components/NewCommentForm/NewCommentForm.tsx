import React, { useState } from 'react';

import './NewCommentForm.scss';

type Props = {
  onSubmitAddComment: (name: string, email: string, body: string) => void
};

export const NewCommentForm: React.FC<Props> = ({ onSubmitAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(true);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const validateEmail = (mail: string) => {
    return mail
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && validateEmail(email) && body.trim()) {
      setIsFormFilled(true);
      onSubmitAddComment(name, email, body);
      setName('');
      setEmail('');
      setBody('');
    } else {
      setIsFormFilled(false);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitForm}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={changeName}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={changeEmail}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={changeBody}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      {!isFormFilled && (
        <div className="NewCommentForm__error-message">Filling form not completed!</div>
      )}
    </form>
  );
};

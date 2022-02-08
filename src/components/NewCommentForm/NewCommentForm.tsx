import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onAdd: (
    name: string,
    email: string,
    body: string,
  ) => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = ({
  onAdd,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentName(event.target.value);
  };

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentEmail(event.target.value);
  };

  const changeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(event.target.value);
  };

  const clearForm = () => {
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(commentName, commentEmail, commentBody);
    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handlerSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={changeName}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentEmail}
          onChange={changeEmail}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={changeBody}
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

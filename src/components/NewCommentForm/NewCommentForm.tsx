import React from 'react';
import './NewCommentForm.scss';

type Props = {
  name: string;
  email: string;
  body: string;
  changeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeBody: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  addComment: () => void;
};

export const NewCommentForm: React.FC<Props> = (
  {
    name,
    email,
    body,
    changeName,
    changeEmail,
    changeBody,
    addComment,
  },
) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
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
          value={email}
          onChange={changeEmail}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={changeBody}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={addComment}
      >
        Add a comment
      </button>
    </form>
  );
};

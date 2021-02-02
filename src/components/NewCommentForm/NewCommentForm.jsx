import React, { useState } from 'react';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, createComment}) => {
  const [nameOfAuthor, setName] = useState('');
  const [emailOfAuthor, setEmail] = useState('');
  const [bodyOfComment, setBodyOfComment] = useState('');

  const handleChangeName = ({ target }) => {
    const { value } = target;

    setName(value);
  };

  const handleChangeEmail = ({ target }) => {
    const { value } = target;

    setEmail(value);
  };

  const handleChangeBody = ({ target }) => {
    const { value } = target;

    setBodyOfComment(value);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        createComment(nameOfAuthor, emailOfAuthor, bodyOfComment, postId);
        setName('');
        setEmail('');
        setBodyOfComment('');
      }}
    >
      <div className="form-field">
        <input
          value={nameOfAuthor}
          onChange={e => handleChangeName(e)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={emailOfAuthor}
          onChange={e => handleChangeEmail(e)}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={bodyOfComment}
          onChange={e => handleChangeBody(e)}
          name="body"
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

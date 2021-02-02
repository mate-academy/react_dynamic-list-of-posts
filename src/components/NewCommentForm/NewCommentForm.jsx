import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ addComment }) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addComment(title, email, name);
        setTitle('');
        setName('');
        setEmail('');
      }}

    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          className="NewCommentForm__input"
          placeholder="Your name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          className="NewCommentForm__input"
          placeholder="Your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          className="NewCommentForm__input"
          placeholder="Type comment here"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
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

NewCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

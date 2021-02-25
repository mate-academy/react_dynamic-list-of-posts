import React, { useState } from 'react';
import './NewCommentForm.scss';

import PropTypes from 'prop-types';

export const NewCommentForm = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() && email.trim() && body.trim()) {
      addComment(name, email, body);
      setName('');
      setEmail('');
      setBody('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setName(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setBody(target.value);
          }}
        />
      </div>

      {(error && (!name || !email || !body))
        && (
        <p className="NewCommentForm__error">
          Please, fill in all the fields
        </p>
        )
      }

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

import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setError(false);
  };

  const nameHandleClick = (event) => {
    const { value } = event.target;

    setName(value);
    if (value.length > 0) {
      setError(false);
    }
  };

  const emailHandleClick = (event) => {
    const { value } = event.target;

    setEmail(value);
    if (value.length > 0) {
      setError(false);
    }
  };

  const bodyHandleClick = (event) => {
    const { value } = event.target;

    setBody(value);
    if (value.length > 0) {
      setError(false);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (name.trim() && email.trim() && body.trim()) {
          addComment(name, email, body);
          resetForm();
        } else {
          setError(true);
        }
      }}
    >
      {error && (
        <p className="NewCommentForm__error">
          Fill all fields to add a comment!
        </p>
      )}

      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={nameHandleClick}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={emailHandleClick}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={bodyHandleClick}
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

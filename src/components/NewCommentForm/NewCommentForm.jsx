import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errorEmptyStr, setErrorEmptyStr] = useState(false);

  const createComment = () => {
    if (name.trim() && email.trim() && body.trim()) {
      addComment({
        name, email, body,
      });
      setName('');
      setEmail('');
      setBody('');
    } else {
      setErrorEmptyStr(true);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        createComment();
      }}
    >
      <div className="form-field">
        {errorEmptyStr && (
          <p className="NewCommentForm__error">You try to add ampty string</p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setErrorEmptyStr(false);
            setName(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setErrorEmptyStr(false);
            setEmail(event.target.value);
          }}
          required

        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setErrorEmptyStr(false);
            setBody(event.target.value);
          }}
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

NewCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

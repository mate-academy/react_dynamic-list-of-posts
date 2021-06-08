import React, { useState } from 'react';
import './NewCommentForm.scss';

import PropTypes from 'prop-types';

export const NewCommentForm = ({ onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  return (
    <form
      className="NewCommentForm"
      action=""
      method="POST"
      onSubmit={async(event) => {
        event.preventDefault();

        await onAddComment({
          name, email, body,
        });

        setName('');
        setEmail('');
        setBody('');
      }}
    >
      <div className="form-field">
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          onChange={({ target }) => setBody(target.value)}
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

NewCommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!name || !body || !email) {
      setError('Fill all fields, please');

      return;
    }

    if (!email.includes('@')) {
      setError('Something wrong with entered email');

      return;
    }

    await addComment(postId, name, email, body);
    updateComments();

    setBody('');
    setError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError('');

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default: setError('');
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
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {error && <p className="NewCommentForm__error">{error}</p>}
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  updateComments: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';
import { create } from '../../api/comments';

export const NewCommentForm = ({ id }) => {
  const [nameInput, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [warning, setWarning] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setWarning('');

        return setName(value);

      case 'email':
        setWarning('');

        return setEmail(value);

      case 'body':
        setWarning('');

        return setBody(value);

      default:
        return 0;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nameInput || !email || !body) {
      return setWarning('Some field empty');
    }

    const newComment = {
      postId: id,
      name: nameInput,
      email,
      body,
    };

    create(newComment);

    setName('');
    setEmail('');

    return setBody('');
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
          value={nameInput}
          onChange={handleChange}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={handleChange}
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
      <div style={{ color: 'red' }}>{warning}</div>
    </form>
  );
};

NewCommentForm.propTypes = {
  id: PropTypes.number.isRequired,
};

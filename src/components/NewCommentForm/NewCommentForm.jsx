import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';

export const NewCommentForm = ({ id, onAdd }) => {
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
        return name;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nameInput || !email || !body) {
      setWarning('Some field empty');
    } else {
      const newComment = {
        postId: id,
        name: nameInput,
        email,
        body,
      };

      onAdd(newComment);
      setName('');
      setEmail('');
      setBody('');
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
      <div className="warning-message">{warning}</div>
    </form>
  );
};

NewCommentForm.propTypes = {
  id: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

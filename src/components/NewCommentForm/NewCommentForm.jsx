import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const newComment = {
      name,
      email,
      body: comment,
    };

    onSubmit(newComment);

    setName('');
    setEmail('');
    setComment('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={comment}
          onChange={event => setComment(event.target.value)}
          className="NewCommentForm__input"
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
  onSubmit: PropTypes.func.isRequired,
};

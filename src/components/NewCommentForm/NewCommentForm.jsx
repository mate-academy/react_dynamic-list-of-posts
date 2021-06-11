import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, addNewComment }) => {
  const [name, getName] = useState('');
  const [email, getEmail] = useState('');
  const [body, getBody] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      body,
      postId,
    };

    addNewComment(data);
    getName('');
    getEmail('');
    getBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => getName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => getEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => getBody(event.target.value)}
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
  postId: PropTypes.number.isRequired,
  addNewComment: PropTypes.func.isRequired,
};

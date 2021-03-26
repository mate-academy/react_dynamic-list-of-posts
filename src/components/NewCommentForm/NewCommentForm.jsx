import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId }) => {
  const [name, getName] = useState('');
  const [email, getEmail] = useState('');
  const [body, getBody] = useState('');

  const changeHandler = (state, event) => state(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();

    createComment(name, postId, email, body);
    getName('');
    getEmail('');
    getBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => submitHandler(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => changeHandler(getName, event)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => changeHandler(getEmail, event)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => changeHandler(getBody, event)}
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
  postId: PropTypes.number,
};

NewCommentForm.defaultProps = {
  postId: 0,
};

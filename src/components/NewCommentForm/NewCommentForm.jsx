import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addPostComment, getPostComments } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ id, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    addPostComment(id, name, email, comment)
      .then(() => getPostComments(id)
        .then(result => setComments(result)));

    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={e => setComment(e.target.value)}
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
  id: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};

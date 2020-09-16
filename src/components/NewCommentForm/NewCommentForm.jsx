import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

import { getPostComments, addNewComment } from '../../api/comments';

export const NewCommentForm = ({ postId, getComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  async function sendNewComment() {
    await addNewComment({
      postId, name, email, body,
    });
    getPostComments(postId)
      .then(getComments);

    setName('');
    setEmail('');
    setBody('');
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendNewComment();
      }}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
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
          onChange={({ target }) => {
            setEmail(target.value);
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
          onChange={({ target }) => {
            setBody(target.value);
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
  postId: PropTypes.number.isRequired,
  getComments: PropTypes.func.isRequired,
};

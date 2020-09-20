import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

export const NewCommentForm = ({ selectedPost, loadPostComments }) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentBody, setNewCommentBody] = useState('');

  function sendData() {
    (newCommentName && newCommentEmail && newCommentBody)
      && addComment(
        selectedPost,
        newCommentName,
        newCommentEmail,
        newCommentBody,
      ).then(loadPostComments);

    setNewCommentName('');
    setNewCommentEmail('');
    setNewCommentBody('');
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        sendData();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          autoComplete="off"
          value={newCommentName}
          onChange={({ target }) => setNewCommentName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          autoComplete="off"
          value={newCommentEmail}
          onChange={({ target }) => setNewCommentEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          autoComplete="off"
          value={newCommentBody}
          onChange={({ target }) => setNewCommentBody(target.value)}
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
  loadPostComments: PropTypes.func.isRequired,
  selectedPost: PropTypes.number.isRequired,
};

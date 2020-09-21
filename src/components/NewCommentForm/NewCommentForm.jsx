import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addComment } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, loadComments }) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
    postId,
  });

  const setCommentPart = (key, value) => {
    setNewComment({
      ...newComment,
      [key]: value,
      postId,
    });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addComment(newComment)
          .then(loadComments);
        setNewComment({
          name: '',
          email: '',
          body: '',
        });
      }}
    >
      <div className="form-field">
        <input
          value={newComment.name}
          onChange={({ target }) => setCommentPart(target.name, target.value)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={newComment.email}
          onChange={({ target }) => setCommentPart(target.name, target.value)}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={newComment.body}
          onChange={({ target }) => setCommentPart(target.name, target.value)}
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
  postId: PropTypes.string.isRequired,
  loadComments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

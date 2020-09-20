import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, addComment }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const setCommentPart = (key, value) => {
    setComment(prevComment => ({
      ...prevComment,
      [key]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      ...comment,
      postId: selectedPostId,
    };

    addComment(newComment);

    setComment({
      name: '',
      email: '',
      body: '',
    });
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
          value={comment.name}
          onChange={({ target }) => setCommentPart(target.name, target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={({ target }) => setCommentPart(target.name, target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={({ target }) => setCommentPart(target.name, target.value)}
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
  selectedPostId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

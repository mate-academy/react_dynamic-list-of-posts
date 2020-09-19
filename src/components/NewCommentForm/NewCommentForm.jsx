import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, getCommentsFromServer }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const addNewComment = async() => {
    const { name, email, body } = comment;

    await addComment(selectedPostId, name, email, body);
    getCommentsFromServer(selectedPostId);
  };

  const handleCommentSubmit = (target) => {
    const { name, value } = target;

    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addNewComment();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={({ target }) => handleCommentSubmit(target)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={({ target }) => handleCommentSubmit(target)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={({ target }) => handleCommentSubmit(target)}
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
  selectedPostId: PropTypes.number.isRequired,
  getCommentsFromServer: PropTypes.func.isRequired,
};

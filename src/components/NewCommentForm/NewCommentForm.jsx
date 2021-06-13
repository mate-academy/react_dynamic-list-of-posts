import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ selectedPostId, onAddComment }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setComment({
      name: '',
      email: '',
      body: '',
    });
  };

  return (
    <form
      method="POST"
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          onChange={event => setComment({
            ...comment,
            name: event.target.value,
          })}
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          onChange={event => setComment({
            ...comment,
            email: event.target.value,
          })}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          onChange={event => setComment({
            ...comment,
            body: event.target.value,
          })}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={() => onAddComment({
          postId: selectedPostId,
          ...comment,
        })}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  selectedPostId: PropTypes.number,
  onAddComment: PropTypes.func.isRequired,
};

NewCommentForm.defaultProps = {
  selectedPostId: 0,
};

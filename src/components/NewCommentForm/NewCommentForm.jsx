import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, onAddComment }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  function handleSubmit(e) {
    e.preventDefault();

    setComment({
      name: '',
      email: '',
      body: '',
    });
  }

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
          onChange={e => setComment({
            ...comment,
            name: e.target.value,
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
          onChange={e => setComment({
            ...comment,
            email: e.target.value,
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
          onChange={e => setComment({
            ...comment,
            body: e.target.value,
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

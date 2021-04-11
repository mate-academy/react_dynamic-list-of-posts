import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = React.memo(
  ({ loadComments }) => {
    const [newComment, setNewComment] = useState({
      name: '', email: '', body: '',
    });

    const handleChange = ({ target }) => {
      const { name, value } = target;

      setNewComment({
        ...newComment,
        [name]: value,
      });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      loadComments(newComment);
      setNewComment({
        name: '',
        email: '',
        body: '',
      });
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="NewCommentForm"
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={newComment.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={newComment.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={newComment.body}
            onChange={handleChange}
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
  },
);

NewCommentForm.propTypes = {
  loadComments: PropTypes.func.isRequired,
};

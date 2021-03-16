import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ addComment }) => {
  const [comment, setComment] = useState({
    name: '',
    body: '',
    email: '',
  });
  const [isFormValid, setIsFormValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(comment).some(item => !item.trim())) {
      setIsFormValid(false);

      return;
    }

    addComment(comment.name, comment.email, comment.body);
    resetCommentForm();
    setIsFormValid(true);
  };

  const handleChange = ({ target }) => {
    setComment(prev => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const resetCommentForm = () => {
    setComment({
      name: '',
      body: '',
      email: '',
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
          value={comment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      {!isFormValid && (
        <p className="NewCommentForm__error">
          Form should not have empty fields.
        </p>
      )}

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
  addComment: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ getNewComment, loadData }) => {
  const [newComment, setNewComment] = useState({
    name: '', email: '', body: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getNewComment(newComment);
    setNewComment({
      name: '',
      email: '',
      body: '',
    });

    loadData();
  };

  return (
    <form onSubmit={handleSubmit} className="NewCommentForm">
      <div className="form-field">
        <input
          value={newComment.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          value={newComment.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          value={newComment.body}
          onChange={handleChange}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
        />
      </div>

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  getNewComment: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

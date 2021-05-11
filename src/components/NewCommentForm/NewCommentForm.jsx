import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './NewCommentForm.scss';

export const NewCommentForm = React.memo(({ addNewComment }) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
    id: uuidv4(),
  });

  const handleChangeInput = (handleEvent) => {
    const { name, value } = handleEvent.target;

    setNewComment(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (clickEvent) => {
    clickEvent.preventDefault();

    addNewComment(newComment);

    setNewComment({
      name: '',
      email: '',
      body: '',
      id: '',
    });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comments here"
          className="NewCommentForm__input"
          value={newComment.body}
          onChange={handleChangeInput}
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
});

NewCommentForm.propTypes = {
  addNewComment: PropTypes.func.isRequired,
};

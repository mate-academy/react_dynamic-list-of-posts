import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, newComment }) => {
  const [inputs, setInputs] = useState({
    body: '',
    name: '',
    email: '',
  });

  function resetForm() {
    setInputs({
      body: '',
      name: '',
      email: '',
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setInputs(current => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSumbit(event) {
    event.preventDefault();
    newComment({
      ...inputs,
      postId,
    });

    resetForm();
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSumbit}
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        required
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  newComment: PropTypes.func.isRequired,
};

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, addNewComment }) => {
  const [inputs, setInputs] = useState({
    body: '',
    name: '',
    email: '',
  });

  const resetForm = useCallback(
    () => {
      setInputs({
        body: '',
        name: '',
        email: '',
      });
    }, [],
  );

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setInputs(currentInputsValues => ({
        ...currentInputsValues,
        [name]: value,
      }));
    }, [],
  );

  const handleSumbit = useCallback(
    (event) => {
      event.preventDefault();
      addNewComment({
        ...inputs,
        postId,
      });

      resetForm();
    }, [inputs, postId, resetForm, addNewComment],
  );

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
  addNewComment: PropTypes.func.isRequired,
};

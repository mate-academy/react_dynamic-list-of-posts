import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ postId, addComment }) => {
  const [obj, setValue] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = Object.values(obj);
    const checkOnValid = inputs.every(input => input.trim().length > 2);

    if (checkOnValid) {
      const newComment = {
        postId,
        ...obj,
      };

      addComment(newComment);
      defaultState();
    }
  };

  const defaultState = () => {
    setValue({
      name: '',
      email: '',
      body: '',
    });
  };

  const onChangeValue = (e) => {
    const { value, name } = e.target;

    setValue({
      ...obj,
      [name]: value,
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
          value={obj.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={onChangeValue}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={obj.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={onChangeValue}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={obj.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={onChangeValue}
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
  postId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

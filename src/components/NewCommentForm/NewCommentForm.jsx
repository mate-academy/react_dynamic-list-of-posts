import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { addComment } from '../../api/posts';

export const NewCommentForm = ({ addCommentInPostDetails, postId }) => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    body: '',
  });

  const clearForm = () => {
    setInputValue({
      name: '',
      email: '',
      body: '',
    });
  };

  const changeInput = (event) => {
    const { name, value } = event.target;

    setInputValue(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    const newComment = {
      id: new Date().getTime(),
      postId,
      ...inputValue,
      createdAt: String(new Date()),
      updatedAt: String(new Date()),
    };

    addCommentInPostDetails(newComment);
    addComment(newComment);
    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => submitForm(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={inputValue.name}
          onChange={event => changeInput(event)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={inputValue.email}
          onChange={event => changeInput(event)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={inputValue.body}
          onChange={event => changeInput(event)}
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
  addCommentInPostDetails: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

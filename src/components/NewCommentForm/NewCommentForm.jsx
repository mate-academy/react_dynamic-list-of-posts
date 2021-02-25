import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ postId, postComment }) => {
  const [commentFields, setCommentFields] = useState({
    body: '',
    name: '',
    email: '',
  });

  const resetForm = () => {
    setCommentFields({
      body: '',
      name: '',
      email: '',
    });
  };

  const setForm = (event) => {
    const { name, value } = event.target;

    setCommentFields(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        postComment({
          ...commentFields, postId,
        });

        resetForm();
      }}
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          value={commentFields.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={setForm}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="text"
          name="email"
          value={commentFields.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={setForm}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="Type comment here"
          value={commentFields.body}
          className="NewCommentForm__input"
          onChange={setForm}
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
  postComment: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createComment, getComments } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, setComments }) => {
  const [inputs, setInputs] = useState({
    name: '', email: '', body: '',
  });

  const handleChange = ({ name, value }) => {
    setInputs({ [name]: value });
  };

  const clearForm = () => {
    setInputs({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    await createComment(postId, inputs);
    const comments = await getComments(postId);

    setComments(comments);
    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={inputs.name}
          onChange={event => handleChange(event.target)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={inputs.email}
          onChange={event => handleChange(event.target)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={inputs.body}
          onChange={event => handleChange(event.target)}
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
  setComments: PropTypes.func.isRequired,
};

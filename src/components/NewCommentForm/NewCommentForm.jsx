import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNewComment, getPostComments } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, setPostComments }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const validateCommentInputs = () => {
    if (comment.name === '') {
      setErrors({ name: true });

      return false;
    }

    setErrors({ name: false });

    if (comment.email === '') {
      setErrors({ email: true });

      return false;
    }

    setErrors({ email: false });

    if (comment.body === '') {
      setErrors({ body: true });

      return false;
    }

    setErrors({ body: false });

    return true;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!validateCommentInputs()) {
      return;
    }

    const newComment = {
      ...comment,
      postId: selectedPostId,
    };

    await addNewComment(newComment);
    await getPostComments(selectedPostId).then(setPostComments);
    setComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleChange = (event) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
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
          placeholder="Your name"
          value={comment.name}
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>
      {errors.name && <h3>Please, enter your name</h3>}

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={comment.email}
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>
      {errors.email && <h3>Please, enter your email</h3>}

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={comment.body}
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>
      {errors.body && <h3>Please, enter your comment</h3>}

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
  selectedPostId: PropTypes.number.isRequired,
  setPostComments: PropTypes.func.isRequired,
};

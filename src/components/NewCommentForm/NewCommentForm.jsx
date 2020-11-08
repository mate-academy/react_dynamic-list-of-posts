import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postComment } from '../../api/comments';

import { FormField } from '../FormField';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, getComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addNewComment();
  };

  const addNewComment = async() => {
    const data = {
      postId,
      name,
      email,
      body: comment,
    };

    const respones = await postComment(data, errors);

    if (!respones.ok) {
      return;
    }

    setComment('');
    getComments(postId);
  };

  return (
    <div className="PostDetails__form-wrapper">
      <form className="NewCommentForm" onSubmit={handleSubmit}>
        <header className="NewCommentForm__header">New Comment</header>
        <FormField
          name="name"
          value={name}
          changeHandler={handleNameChange}
          errors={errors}
          setErrors={setErrors}
        />

        <FormField
          name="email"
          value={email}
          changeHandler={handleEmailChange}
          errors={errors}
          setErrors={setErrors}
        />

        <FormField
          name="comment"
          value={comment}
          changeHandler={handleCommentChange}
          errors={errors}
          setErrors={setErrors}
        />

        <button
          type="submit"
          className="NewCommentForm__submit-button button"
          value={comment}
        >
          Add a comment
        </button>
      </form>
    </div>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  getComments: PropTypes.func.isRequired,
};

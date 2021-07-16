import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';
import { addNewComment, getPostComments } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, setPostComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const validateCommentInputs = (field, input) => {
    if (!input) {
      setErrors({ [field]: true });

      return false;
    }

    setErrors({ [field]: false });

    return true;
  };

  const setDefaultValues = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateCommentInputs('name', name)
    || !validateCommentInputs('email', email)
    || !validateCommentInputs('body', body)) {
      return;
    }

    const newComment = {
      name,
      email,
      body,
      postId: selectedPostId,
      createdAt: new Date(),
      id: uuid(),
    };

    await addNewComment(newComment);
    getPostComments(selectedPostId).then(setPostComments);
    setDefaultValues();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={e => handleSubmit(e)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          className="NewCommentForm__input"
          onChange={e => setName(e.target.value)}
        />
      </div>
      {errors.name && <h3>Please, enter your name</h3>}

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={email}
          className="NewCommentForm__input"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      {errors.email && <h3>Please, enter your email</h3>}

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          className="NewCommentForm__input"
          onChange={e => setBody(e.target.value)}
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

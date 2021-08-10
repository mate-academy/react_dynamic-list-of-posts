import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addComment, getPostComments } from '../../api/comments';

import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setComment('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      postId: selectedPostId,
      name,
      email,
      body: comment,
    };

    addComment(newComment)
      .then(() => getPostComments(selectedPostId))
      .then(result => setComments(result));
    clearForm();
  };

  return (
    <form
      onSubmit={event => handleSubmit(event)}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={((event) => {
            setName(event.target.value);
          })}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>
      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={((event) => {
            setEmail(event.target.value);
          })}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          onChange={((event) => {
            setComment(event.target.value);
          })}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
  selectedPostId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};

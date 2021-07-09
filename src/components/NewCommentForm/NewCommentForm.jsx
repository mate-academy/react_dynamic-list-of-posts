import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const newComment = {
    postId: props.postId,
    name,
    email,
    body: comment,
  };

  const SubmitAndClearForm = (event) => {
    props.handleSubmit(event, newComment);
    setComment('');
    setEmail('');
    setName('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        SubmitAndClearForm(event);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={event => setComment(event.target.value)}
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
  handleSubmit: PropTypes.func.isRequired,
};

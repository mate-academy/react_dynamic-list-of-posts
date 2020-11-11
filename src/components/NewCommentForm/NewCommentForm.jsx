import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({
  postId,
  add,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const id = 1;

  const setValueName = (event) => {
    const { value } = event.target;

    setName(value);
  };

  const setValueEmail = (event) => {
    const { value } = event.target;

    setEmail(value);
  };

  const setValueBody = (event) => {
    const { value } = event.target;

    setBody(value);
  };

  const handleSubmitNewComment = (e) => {
    e.preventDefault();

    const newComment = {
      id,
      postId,
      name,
      email,
      body,
    };

    add(newComment);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmitNewComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={setValueName}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={setValueEmail}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={setValueBody}
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
  add: PropTypes.func.isRequired,
};

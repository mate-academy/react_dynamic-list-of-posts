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

  const setValueName = (event) => {
    setName(event.target.value);
  };

  const setValueEmail = (event) => {
    setEmail(event.target.value);
  };

  const setValueBody = (event) => {
    setBody(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    add(newComment);

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitForm}
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

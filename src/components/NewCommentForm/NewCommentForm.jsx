import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ postId, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const inputHandler = (event, callback) => {
    callback(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    onAdd({
      name,
      body,
      email,
      postId,
    });

    clearForm();
  };

  const clearForm = () => {
    setBody('');
    setName('');
    setEmail('');
  };

  return (
    <form className="NewCommentForm" onSubmit={submitHandler}>
      <div className="form-field">
        <input
          type="text"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => inputHandler(event, setName)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => inputHandler(event, setEmail)}
        />
      </div>

      <div className="form-field">
        <textarea
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => inputHandler(event, setBody)}
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
  onAdd: PropTypes.func.isRequired,
};

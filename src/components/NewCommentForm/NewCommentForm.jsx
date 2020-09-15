import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, onCommentAddition }) => {
  const [inputName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value.trimLeft());
    }

    if (name === 'email') {
      setEmail(value.trimLeft());
    }

    if (name === 'body') {
      setBody(value.trimLeft());
    }
  };

  const handleFormSubmit = () => {
    onCommentAddition(postId, inputName, email, body);

    setName('');

    setEmail('');

    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <div className="form-field">
        <input
          value={inputName}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
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
  onCommentAddition: PropTypes.func.isRequired,
};

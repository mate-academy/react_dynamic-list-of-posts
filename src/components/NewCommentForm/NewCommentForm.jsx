import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ postId, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const inputHandler = (event) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
    }
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
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={inputHandler}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={inputHandler}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={inputHandler}
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name: inputName, value } = event.target;

    switch (inputName) {
      case 'name':
        setName(value.trim());
        break;

      case 'email':
        setEmail(value.trim());
        break;

      case 'body':
        setBody(value.trim());
        break;

      default:
        setMessage('something went wrong');
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        addComment(postId, name, email, body);
        setName('');
        setEmail('');
        setBody('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          autoComplete="off"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          autoComplete="off"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          autoComplete="off"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {
        message
          ? (<p>{message}</p>)
          : ''
      }
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
};

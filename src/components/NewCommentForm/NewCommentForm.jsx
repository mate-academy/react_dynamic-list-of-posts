import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { writeComment } from '../../helpers';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const sendForm = () => {
    const newMessage = {
      postId,
      name,
      email,
      body,
    };

    setName('');
    setEmail('');
    setBody('');
    writeComment(newMessage);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={
        (event) => {
          event.preventDefault();
          sendForm();
        }
      }
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
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
};

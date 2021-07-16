import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNewComment } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [inputsAreValid, setInputsAreValid] = useState(true);

  const addComment = () => {
    if (!name || !email || !body) {
      setInputsAreValid(false);

      return;
    }

    const newComment = {
      name,
      email,
      body,
      postId: selectedPostId,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 99999) + 22222, // id from 22222 to 99999
    };

    setInputsAreValid(true);
    addNewComment(newComment);
  };

  const setDefaultValues = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment();
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

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          className="NewCommentForm__input"
          onChange={e => setBody(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      {!inputsAreValid && <h3>Empty fields are not allowed!</h3>}
    </form>
  );
};

NewCommentForm.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};

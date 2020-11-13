import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, loadData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [validation, setValidation] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
    setValidation(false);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setValidation(false);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
    setValidation(false);
  };

  const submitComment = async(event) => {
    event.preventDefault();

    if (name === '' || email === '' || comment === '') {
      setValidation(true);

      return;
    }

    await addComment({
      name,
      email,
      body: comment,
      postId: selectedPostId,
    });

    setName('');
    setEmail('');
    setComment('');

    loadData();
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          onChange={handleName}
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          onChange={handleEmail}
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          onChange={handleComment}
          value={comment}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      {validation && (
        <p className="NewCommentForm__error">
          All fields must be filled
        </p>
      )}

      <button
        onClick={submitComment}
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
  loadData: PropTypes.func.isRequired,
}.isRequired;

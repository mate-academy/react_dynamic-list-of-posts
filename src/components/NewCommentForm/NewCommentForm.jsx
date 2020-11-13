import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, loadData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async(event) => {
    event.preventDefault();

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

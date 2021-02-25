import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ postId, postComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setNewComment] = useState('');

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setName(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setNewComment(target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(event) => {
          event.preventDefault();
          const newComment = {
            postId,
            name,
            email,
            body,
          };

          postComment(newComment);

          setNewComment('');
          setEmail('');
          setName('');
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  postComment: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNewComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({
  postId,
  showComments,
  setLoadingComments,
}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const resetForm = () => {
    setUserName('');
    setEmail('');
    setComment('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={async(event) => {
        setLoadingComments(true);

        const newComment = {
          postId,
          name: userName,
          email,
          body: comment,
        };

        event.preventDefault();
        resetForm();

        await addNewComment(newComment);
        await showComments();

        setLoadingComments(false);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setUserName(target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={email}
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={comment}
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setComment(target.value);
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
  showComments: PropTypes.func.isRequired,
  setLoadingComments: PropTypes.func.isRequired,
};

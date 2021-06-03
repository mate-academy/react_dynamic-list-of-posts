import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onAddComment }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [valid, setValid] = useState(true);
  const handleForm = () => {
    if (Object.values(comment).every(field => field)) {
      onAddComment(comment);
      setComment({
        name: '',
        email: '',
        body: '',
      });
    } else {
      setValid(false);
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={(e) => {
            setComment({
              ...comment,
              name: e.target.value,
            });
            setValid(true);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={(e) => {
            setComment({
              ...comment,
              email: e.target.value,
            });
            setValid(true);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={(e) => {
            setComment({
              ...comment,
              body: e.target.value,
            });
            setValid(true);
          }}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={handleForm}
      >
        Add a comment
      </button>
      {!valid && (
        <span style={{
          color: 'red',
          fontSize: '14px',
        }}
        >
          Fill  all  fields
        </span>
      )}
    </form>
  );
};

NewCommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

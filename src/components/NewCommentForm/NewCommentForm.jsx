import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, addComment }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={userName}
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            setUserName(event.target.value.trim());
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            setEmail(event.target.value.trim());
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => {
            setBody(event.target.value.trim());
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={() => {
          if (body && userName && email) {
            addComment(postId, userName, email, body);

            setUserName('');
            setEmail('');
            setBody('');
          }
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

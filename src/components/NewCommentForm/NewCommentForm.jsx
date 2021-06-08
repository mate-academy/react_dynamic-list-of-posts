import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

import { } from '../../api/posts';

export const NewCommentForm = ({ onCommentAdd }) => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [commentText, setCommentText] = useState();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onCommentAdd({
          userName, userEmail, commentText,
        });
        setCommentText('');
      }}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          required
          onChange={
            (event) => {
              setUserName(event.target.value);
            }
          }
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          required
          onChange={
            (event) => {
              setUserEmail(event.target.value);
            }
          }
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          required
          value={commentText}
          onChange={
            (event) => {
              setCommentText(event.target.value);
            }
          }
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
  onCommentAdd: PropTypes.func.isRequired,
};

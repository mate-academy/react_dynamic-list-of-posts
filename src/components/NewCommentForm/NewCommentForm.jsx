import React from 'react';
import './NewCommentForm.scss';

export const NewCommentForm = () => (
  <form className="NewCommentForm">
    <div className="form-field">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="NewCommentForm__input"
      />
    </div>

    <div className="form-field">
      <input
        type="text"
        name="email"
        placeholder="Your email"
        className="NewCommentForm__input"
      />
    </div>

    <div className="form-field">
      <textarea
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

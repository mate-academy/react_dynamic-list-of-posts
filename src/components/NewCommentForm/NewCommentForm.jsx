import React from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';

import { addPostComment } from '../../api/comments';

export const NewCommentForm = ({ selectedPostId, reloadComments }) => {
  const formHandler = function(event) {
    const newComment = {
      name: event.target.name.value,
      email: event.target.email.value,
      body: event.target.body.value,
    };

    addPostComment(selectedPostId, ...Object.values(newComment))
      .then(() => {
        reloadComments();
      });
    event.preventDefault();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={formHandler}
    >
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
};

NewCommentForm.propTypes = {
  selectedPostId: PropTypes.string.isRequired,
  reloadComments: PropTypes.func.isRequired,
};

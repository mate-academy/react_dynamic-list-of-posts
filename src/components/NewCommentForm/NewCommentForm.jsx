import React from 'react';
import './NewCommentForm.scss';

import PropTypes from 'prop-types';

export const NewCommentForm = ({
  name,
  setName,
  email,
  setEmail,
  comment,
  setComment,
  addToList,
}) => {
  const formSubmit = (event) => {
    event.preventDefault();
    addToList();
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => formSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={event => setComment(event.target.value)}
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
  name: PropTypes.string,
  setName: PropTypes.func.isRequired,
  email: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  comment: PropTypes.string,
  setComment: PropTypes.func.isRequired,
  addToList: PropTypes.func.isRequired,
};

NewCommentForm.defaultProps = {
  name: '',
  email: '',
  comment: '',
};

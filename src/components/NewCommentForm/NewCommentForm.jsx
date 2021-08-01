import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

export const NewCommentForm = ({
  changeLoadingStatus,
  selectedPostId,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const createNewComment = (event) => {
    event.preventDefault();

    const comment = {
      postId: selectedPostId,
      name: authorName,
      email: authorEmail,
      body: commentBody,
    };

    addComment(comment);
    changeLoadingStatus(true);
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => createNewComment(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={authorName}
          onChange={event => setAuthorName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={authorEmail}
          onChange={event => setAuthorEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={event => setCommentBody(event.target.value)}
          required
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
  changeLoadingStatus: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};

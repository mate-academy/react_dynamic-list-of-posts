import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { addNewComment } from '../../api/comments';

export const NewCommentForm = ({ postId, addComment }) => {
  const [nameContent, setNameContent] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [bodyContent, setBodyContent] = useState('');

  const addNameContent = (event) => {
    setNameContent(event.target.value);
  };

  const addEmailContent = (event) => {
    setEmailContent(event.target.value);
  };

  const addBodyContent = (event) => {
    setBodyContent(event.target.value);
  };

  const handleAddComment = (event) => {
    event.preventDefault();

    const createdComment = {
      postId,
      name: nameContent,
      email: emailContent,
      body: bodyContent,
    };

    addNewComment(createdComment)
      .then(result => result.data);

    addComment(createdComment);
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={addNameContent}
          value={nameContent}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={addEmailContent}
          value={emailContent}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={addBodyContent}
          value={bodyContent}
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
  addComment: PropTypes.func.isRequired,
};

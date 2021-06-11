import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNewComment } from '../../api/comments';

import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, addComment }) => {
  const [nameContent, setName] = useState('');
  const [emailContent, setEmail] = useState('');
  const [bodyContent, setBody] = useState('');

  const addNameContent = (event) => {
    setName(event.target.value);
  };

  const addEmailContent = (event) => {
    setEmail(event.target.value);
  };

  const addBodyContent = (event) => {
    setBody(event.target.value);
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
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
    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleAddComment}
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameContent}
          onChange={addNameContent}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailContent}
          onChange={addEmailContent}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyContent}
          onChange={addBodyContent}
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

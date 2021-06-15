import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewCommentForm.scss';

import { getPostComments, addComment } from '../../api/comments';

export const NewCommentForm = ({ postId, setComments }) => {
  const [comment, setComment] = useState({
    postId,
    name: '',
    email: '',
    body: '',
  });

  const addFieldToComment = (event) => {
    const { name, value } = event.target;

    setComment(createdComment => ({
      ...createdComment,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setComment({
      postId,
      name: '',
      email: '',
      body: '',
    });
  };

  const addNewComment = async() => {
    await addComment(comment);
    getPostComments(postId).then(setComments);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addNewComment();
        clearForm();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={addFieldToComment}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={addFieldToComment}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={addFieldToComment}
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
  setComments: PropTypes.func.isRequired,
};

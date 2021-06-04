import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { postComment, getPostComments } from '../../api/comments';

export const NewCommentForm = ({ postId, setComments }) => {
  const [comment, setComment] = useState({
    postId,
    name: '',
    email: '',
    body: '',
  });

  const createNewComment = ({ target }) => {
    setComment(current => ({
      ...current,
      [target.name]: target.value,
    }));
  };

  const addNewComment = () => {
    postComment(comment)
      .then(getPostComments)
      .then(commentsFromServer => setComments(commentsFromServer.data));
  };

  const clearAll = () => {
    setComment({
      postId,
      name: '',
      email: '',
      body: '',
    });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addNewComment();
        clearAll();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={createNewComment}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={createNewComment}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={createNewComment}
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPostComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ id, getPostComments, setComments }) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        newComment.postId = id;
        if (newComment.name === ''
          || newComment.email === ''
          || newComment.body === '') {
          return;
        }

        addPostComment(newComment)
          .then(() => getPostComments(id)
            .then(setComments));
        setNewComment({
          name: '',
          email: '',
          body: '',
        });
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={newComment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => setNewComment({
            ...newComment,
            name: event.target.value,
          })}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={newComment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => setNewComment({
            ...newComment,
            email: event.target.value,
          })}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={newComment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => setNewComment({
            ...newComment,
            body: event.target.value,
          })}
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
  id: PropTypes.number.isRequired,
  getPostComments: PropTypes.func.isRequired,
  setComments: PropTypes.func.isRequired,
};

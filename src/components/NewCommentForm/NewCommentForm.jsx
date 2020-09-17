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

  const setCommentField = (field, fieldValue) => {
    setNewComment(prevComment => ({
      ...prevComment,
      [field]: fieldValue,
    }));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        newComment.postId = id;
        if (!newComment.name
          || !newComment.email
          || !newComment.body) {
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
          onChange={({ target }) => setCommentField(target.name, target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={newComment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => setCommentField(target.name, target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={newComment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => setCommentField(target.name, target.value)}
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

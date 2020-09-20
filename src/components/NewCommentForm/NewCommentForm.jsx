import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

import { addComment, getPostComments } from '../../api/comments';

export const NewCommentForm = ({ postId, setComments }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, body } = comment;

    comment.postId = postId;

    if (name && email && body) {
      addComment(comment)
        .then(() => getPostComments(comment.postId)
          .then(setComments));

      setComment({
        name: '',
        email: '',
        body: '',
      });
    }
  };

  // const addCommentForm = (data) => {
  //   addComment(data)
  //     .then(() => getPostComments(postId)
  //       .then(setComments));

  //   setComment({
  //     name: '',
  //     email: '',
  //     body: '',
  //   });
  // };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => setComment(data => ({
            ...data,
            name: target.value.trimLeft(),
          }))}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => setComment(data => ({
            ...data,
            email: target.value.trimLeft(),
          }))}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => setComment(data => ({
            ...data,
            body: target.value.trimLeft(),
          }))}
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

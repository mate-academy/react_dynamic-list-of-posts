import React, { useState } from 'react';
import './NewCommentForm.scss';
import { CommentsTypes } from '../Comments/CommentsTypes';
import { createPostComments, getPostComments } from '../../api/posts';

const initialComment = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm = ({ setComments, postId }) => {
  const [comment, setComment] = useState(initialComment);

  const addNewComment = () => {
    createPostComments({
      ...comment,
      postId,
    })
      .then(() => {
        getPostComments(postId)
          .then(result => setComments(result));
      });

    setComment(initialComment);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addNewComment();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => setComment({
            ...comment,
            name: event.target.value,
          })}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => setComment({
            ...comment,
            email: event.target.value,
          })}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => setComment({
            ...comment,
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

NewCommentForm.propTypes = CommentsTypes;

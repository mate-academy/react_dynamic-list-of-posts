import React, { useState } from 'react';
import './NewCommentForm.scss';
import { CommentsTypes } from '../Comments/CommentsTypes';
import { createPostComments, getPostComments } from '../../api/posts';

export const NewCommentForm = ({ setComments, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const addNewComment = () => {
    createPostComments({
      name,
      email,
      body,
      postId,
    })
      .then(() => {
        getPostComments(postId)
          .then(result => setComments(result));
      });

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => event.preventDefault()}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={addNewComment}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = CommentsTypes;

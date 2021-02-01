import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createPostComments } from '../../api/comments';

import './NewCommentForm.scss';

export const NewCommentForm = ({
  postId,
  postComments,
  setPostComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  function createComment() {
    if (name.trim() && email.trim() && body.trim()) {
      createPostComments(postId, name, email, body)
        .then((newComment) => {
          setPostComments([...postComments, newComment]);
        });
    }

    setName('');
    setEmail('');
    setBody('');
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        createComment(postId, name, email, body);
      }}
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
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  postComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setPostComments: PropTypes.func.isRequired,
};

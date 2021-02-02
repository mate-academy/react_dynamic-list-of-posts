import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ loadComments, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const onAddComment = async(event) => {
    event.preventDefault();
    await addComment(postId, name, email, body);

    setName('');
    setEmail('');
    setBody('');

    loadComments();
  };

  return (
    <form className="NewCommentForm" onSubmit={onAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={({ target }) => setBody(target.value)}
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
  loadComments: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getComments, addComment } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name && !email && !body) {
      return;
    }

    addComment(postId, name, email, body)
      .then(() => getComments())
      .then(comments => setComments(comments.filter(
        comment => comment.postId === postId,
      )));

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="form-field">
        <input
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => {
            setBody(e.target.value);
          }}
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

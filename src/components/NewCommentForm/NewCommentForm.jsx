import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createComment } from '../../api/posts';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postID, parsing }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  const formCleaner = () => {
    setName('');
    setEmail('');
    setCommentText('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={async(e) => {
        e.preventDefault();
        formCleaner();
        await createComment({
          postId: postID,
          body: commentText,
          email,
          name,
        }); // (id, postID, body, email, name)
        await parsing();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          required
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
  postID: PropTypes.number.isRequired,
  parsing: PropTypes.func.isRequired,
};

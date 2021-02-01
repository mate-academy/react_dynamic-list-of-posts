import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    addComment(newComment, newComment.postId);
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={e => setName(e.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={e => setEmail(e.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={e => setBody(e.currentTarget.value)}
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
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

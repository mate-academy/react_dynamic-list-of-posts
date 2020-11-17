import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { CommentInput } from './CommentInput';
import { CommentTextarea } from './CommentTextarea';

export const NewCommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const newComment = {
      name,
      email,
      body: comment,
    };

    onSubmit(newComment);

    setName('');
    setEmail('');
    setComment('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="NewCommentForm"
    >
      <CommentInput
        name="name"
        value={name}
        onChange={setName}
        placeholder="Your name"
      />

      <CommentInput
        name="email"
        value={email}
        onChange={setEmail}
        placeholder="Your email"
      />

      <CommentTextarea
        name="body"
        placeholder="Type comment here"
        value={comment}
        onChange={setComment}
      />

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
  onSubmit: PropTypes.func.isRequired,
};

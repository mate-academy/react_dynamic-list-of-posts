import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, loadComments, showLoader }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const createComment = async (event) => {
    event.preventDefault();

    const newComment = {
      postId,
      name,
      email,
      body,
    }

    await addComment(newComment);
      showLoader(true);
      loadComments();
      clearForm();
    }

  const clearForm = () => {
    setBody('');
    setEmail('');
    setName('');
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={createComment}
    >
      <div className="form-field">
        <input
          required
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
  
      <div className="form-field">
        <input
          required
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
  
      <div className="form-field">
        <textarea
          required
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
}

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  loadComments: PropTypes.func.isRequired,
  clearComments: PropTypes.func.isRequired,
}

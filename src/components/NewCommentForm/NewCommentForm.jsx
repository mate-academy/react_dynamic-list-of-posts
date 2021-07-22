import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { addNewComment } from '../../api/coments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, loadComments, setLoadComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleChange = ({ target }) => {
    setError('');

    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'email':
        setEmail(target.value);
        break;
      default:
        setComment(target.value);
    }
  };

  const resetForm = () => {
    setName('');
    setComment('');
    setEmail('');
  };

  const newComment = async(e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !comment.trim()) {
      return setError('no valid data');
    }

    setLoadComments(true);

    const commentBody = {
      postId,
      name,
      email,
      body: comment,
    };

    resetForm();
    await addNewComment(commentBody);
    await loadComments();
    setLoadComments(false);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={newComment}
    >
      {error && <p className="NewCommentForm__error">{error}</p>}
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          required
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={comment}
          onChange={handleChange}
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
  loadComments: PropTypes.func.isRequired,
  setLoadComments: PropTypes.func.isRequired,
};

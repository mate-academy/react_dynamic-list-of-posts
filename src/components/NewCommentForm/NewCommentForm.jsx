import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { postComment } from '../../api/comments';

export const NewCommentForm = ({ postId, handleUpdateComments }) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'commentAuthor':
        setCommentAuthor(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
        break;
    }
  };

  const addComment = async(event) => {
    event.preventDefault();

    const newComment = {
      name: commentAuthor,
      email,
      body,
      postId,
    };

    await postComment(newComment);

    handleUpdateComments();

    setCommentAuthor('');
    setEmail('');
    setBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={addComment}>
      <div className="form-field">
        <input
          type="text"
          name="commentAuthor"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentAuthor}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
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
          value={body}
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
  handleUpdateComments: PropTypes.func.isRequired,
};

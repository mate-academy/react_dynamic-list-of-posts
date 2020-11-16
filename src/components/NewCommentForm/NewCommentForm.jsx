import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { postCommentToServer } from '../../api/comments';

export const NewCommentForm = ({ onAdd, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [commentError, setCommentError] = useState('');

  const addComment = useCallback(async(event) => {
    event.preventDefault();

    if (!name || !email || !body) {
      return;
    }

    const newComment = {
      name,
      body,
      email,
      postId,
    };

    const addedComment = await postCommentToServer(newComment);

    if (addedComment === 'Error') {
      setCommentError('Error');

      return;
    }

    onAdd(prevComments => [...prevComments, newComment]);

    setName('');
    setEmail('');
    setBody('');
  }, [name, body, email, onAdd, postId]);

  return (
    <form className="NewCommentForm" onSubmit={addComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__textarea"
          value={body}
          onChange={event => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      {commentError
        && (
          <p className="errorText">
            Try again leter.
          </p>
        )}
    </form>
  );
};

NewCommentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  postId: PropTypes.number,
};

NewCommentForm.defaultProps = {
  postId: 0,
};

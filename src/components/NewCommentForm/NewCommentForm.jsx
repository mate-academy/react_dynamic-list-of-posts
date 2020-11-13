import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { addCommentToServer } from '../../api/comments';

export function NewCommentForm({ onAdd, postId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [addCommentError, setAddCommentError] = useState('');

  const addComment = useCallback(async(event) => {
    event.preventDefault();

    if (!name || !email || !body) {
      return;
    }

    const newComment = {
      name,
      email,
      body,
      postId,
    };
    const addedComment = await addCommentToServer(newComment);

    if (addedComment === 'Error') {
      setAddCommentError('Error');

      return;
    }

    onAdd(prevComments => [...prevComments, addedComment]);

    setName('');
    setEmail('');
    setBody('');
  }, [body, email, name, onAdd, postId]);

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
          className="NewCommentForm__input"
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
      {addCommentError
        && (
          <p className="errorText">
            Something goes wrong, cannot add a new comment. Try again later.
          </p>
        )}
    </form>
  );
}

NewCommentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  postId: PropTypes.number,
};

NewCommentForm.defaultProps = {
  postId: 0,
};

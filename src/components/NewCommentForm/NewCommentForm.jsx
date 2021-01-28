import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, onCommentSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isErrorNoteVisible, setIsErrorNoteVisible] = useState(false);

  useEffect(() => {
    setIsErrorNoteVisible(false);
  }, [name, email, body]);

  const addComment = () => {
    if (!body) {
      setIsErrorNoteVisible(true);

      return;
    }

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    onCommentSubmit(newComment);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addComment();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          autoComplete="off"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          autoComplete="off"
          required
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

      {isErrorNoteVisible && (
        <div className="NewCommentForm__error">
          Write something
        </div>
      )}

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
  onCommentSubmit: PropTypes.func.isRequired,
};

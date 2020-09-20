import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleCommentSubmition = () => {
    onAddComment(postId, name, email, body);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="newCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        handleCommentSubmition();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          value={name}
          name="name"
          placeholder="Your name"
          className="newCommentForm__input"
          onChange={event => setName(event.target.value.trimLeft())}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          value={email}
          name="email"
          placeholder="Your email"
          className="newCommentForm__input"
          onChange={event => setEmail(event.target.value.trimLeft())}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="newCommentForm__input"
          onChange={event => setBody(event.target.value.trimLeft())}
          required
        />
      </div>

      <button
        type="submit"
        className="newCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

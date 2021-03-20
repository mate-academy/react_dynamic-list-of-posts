import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';

export function NewCommentForm({ postId, onRefreshComment }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const setValue = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        setFirstName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      default:
        setBody(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addComment(firstName, email, body, postId);
    setFirstName('');
    setEmail('');
    setBody('');
    onRefreshComment();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={firstName}
          onChange={setValue}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={setValue}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={setValue}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
  onRefreshComment: PropTypes.func.isRequired,
};

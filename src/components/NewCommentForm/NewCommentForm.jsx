import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

export const NewCommentForm = ({ selectedPostId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSendComment = (event) => {
    event.preventDefault();

    if (name && email && body) {
      addComment(selectedPostId, name, email, body);
      setName('');
      setEmail('');
      setBody('');
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSendComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value.trimLeft())}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value.trimLeft())}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => setBody(event.target.value.trimLeft())}
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
  selectedPostId: PropTypes.number.isRequired,
};

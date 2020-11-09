import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { postNewComment } from '../../api/comments';

export const NewCommentForm = React.memo(({
  currentPostId,
  loadPostComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !body) {
      return;
    }

    postNewComment(currentPostId, name, email, body)
      .then(() => loadPostComments());
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={e => setBody(e.target.value)}
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
});

NewCommentForm.propTypes = {
  currentPostId: PropTypes.number.isRequired,
  loadPostComments: PropTypes.func.isRequired,
};

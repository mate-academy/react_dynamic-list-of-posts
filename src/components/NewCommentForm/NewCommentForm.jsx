import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

import { addPostComment } from '../../api/comments';

export const NewCommentForm = ({ postId, setValue, value }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        addPostComment(postId, name, email, body);
        setName('');
        setEmail('');
        setBody('');
        setValue(current => current + 1);
      }}
    >
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
          type="text"
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
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

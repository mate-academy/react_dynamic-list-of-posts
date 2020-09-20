import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

import { addComment, getPostComments } from '../../api/comments';

export const NewCommentForm = ({ postId, setComments }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const addCommentForm = (id, name, body, email) => {
    addComment(id, name, body, email)
      .then(() => {
        getPostComments(id)
          .then(setComments);
      });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        if (body && userName && email) {
          addCommentForm(postId, userName, email, body);

          setUserName('');
          setEmail('');
          setBody('');
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={userName}
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setUserName(target.value.trim());
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setEmail(target.value.trim());
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setBody(target.value.trim());
          }}
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
  setComments: PropTypes.func.isRequired,
};

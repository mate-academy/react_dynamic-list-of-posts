/* eslint-disable arrow-parens */
import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { post } from '../../api/api';
import { getPostComments } from '../../api/posts';

export const NewCommentForm = ({ selectedPostId, setComments }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if ((userName, email, body)) {
      post('comments', {
        postId: selectedPostId,
        name: userName,
        email,
        body,
      }).then(() => {
        getPostComments(selectedPostId).then((res) => {
          setComments(res);
        });
      });
    }

    setUserName('');
    setEmail('');
    setBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          className="NewCommentForm__input"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </div>

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};

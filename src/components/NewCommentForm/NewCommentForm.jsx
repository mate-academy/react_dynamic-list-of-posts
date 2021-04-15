import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { Loader } from '../Loader';

export const NewCommentForm = ({ postId, onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoad, setLoad] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const bodyHandler = (e) => {
    setBody(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const data = {
      postId,
      name,
      email,
      body,
    };

    onAddComment(data, setLoad);
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={nameHandler}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={emailHandler}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={bodyHandler}
          required
        />
      </div>

      {!isLoad
        ? (
          <button
            type="submit"
            className="NewCommentForm__submit-button button"
          >
            Add a comment
          </button>
        )
        : <Loader />
      }
    </form>
  );
};

NewCommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postComment, getComments } from '../../api/post';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const getNewComments = async(idOfPost) => {
    const newComments = await getComments(idOfPost);

    updateComments(newComments);
  };

  const handleSubmitForm = () => {
    postComment({
      postId,
      name,
      email,
      body,
    });

    setName('');
    setEmail('');
    setBody('');

    getNewComments(postId);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentsInput = (event) => {
    setBody(event.target.value);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        handleSubmitForm();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={handleNameInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleEmailInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={handleCommentsInput}
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

NewCommentForm.propTypes = PropTypes.shape({
  postId: PropTypes.string.isRequired,
  updateComments: PropTypes.func.isRequired,
}).isRequired;

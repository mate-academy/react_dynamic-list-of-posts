import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { writeComment, getComentsById } from '../../helpers';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, commentsUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const newComments = async() => {
    const filteredComments = await getComentsById(postId);

    commentsUpdate(filteredComments);
  };

  const sendForm = () => {
    const newMessage = {
      postId,
      name,
      email,
      body,
    };

    setName('');
    setEmail('');
    setBody('');
    writeComment(newMessage);
    newComments();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    sendForm();
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const changeCommentHandler = (event) => {
    setBody(event.target.value);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={changeNameHandler}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={changeEmailHandler}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={changeCommentHandler}
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
  commentsUpdate: PropTypes.func.isRequired,
};

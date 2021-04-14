import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { addCommentToServer } from '../../api/comments';

const { uuid } = require('uuidv4');

export const NewCommentForm = ({ postId, addCommentLocal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const addComment = async(event) => {
    event.preventDefault();
    const prepearedComment = {
      postId,
      name,
      email,
      body,
      id: uuid(),
    };

    await addCommentToServer(prepearedComment);
    addCommentLocal(prepearedComment);
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={event => addComment(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => setBody(event.target.value)}
          required
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
  addCommentLocal: PropTypes.func.isRequired,
};

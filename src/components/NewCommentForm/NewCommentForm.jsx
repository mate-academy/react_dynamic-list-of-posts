import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, handleAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!name || !email.includes('@') || !body) {
      return;
    }

    const comment = {
      postId,
      name,
      email,
      body,
    };

    const response = await postComment(comment);

    handleAdd(response.data);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value)}
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
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => setBody(event.target.value)}
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
  postId: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

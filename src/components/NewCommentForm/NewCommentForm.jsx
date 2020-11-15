import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, updateComments }) => {
  const [body, setBody] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const sendComment = async(event) => {
    event.preventDefault();

    if (!userName || !body || !email) {
      setError('Fill all fields, please');

      return;
    }

    if (!email.includes('@')) {
      setError('Enter valid email');

      return;
    }

    await createComment(postId, userName, email, body);
    updateComments();

    setBody('');
    setUserName('');
    setEmail('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'body') {
      setBody(value);
    } else if (name === 'name') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    }

    setError('');
  };

  return (
    <form className="NewCommentForm" onSubmit={sendComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={userName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      {error && <p className="NewCommentForm__error">{error}</p>}
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  updateComments: PropTypes.func.isRequired,
};

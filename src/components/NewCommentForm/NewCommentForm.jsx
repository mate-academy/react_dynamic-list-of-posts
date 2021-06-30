import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ setComment, postId }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    const comment = {
      postId,
      name: userName,
      email: userEmail,
      body: userComment,
    };
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    };

    fetch(`${BASE_URL}/comments`, option)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response.status);
        }

        setUserName('');
        setUserEmail('');
        setUserComment('');

        return response.json();
      })
      .then(res => setComment(res.data))
      .catch((error) => {
        // eslint-disable-next-line
        console.error('There was an error!', error);
      });
  };

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setUserName(event.target.value);
        break;

      case 'email':
        setUserEmail(event.target.value);
        break;

      case 'body':
        setUserComment(event.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={userName}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={userEmail}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={userComment}
          onChange={handleInputChange}
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
  setComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

import { } from '../../api/posts';

export const NewCommentForm = ({ onCommentAdd }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    text: '',
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onCommentAdd(userData);
        setUserData(({
          name: '',
          email: '',
          text: '',
        }));
      }}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          required
          value={userData.name}
          onChange={
            (event) => {
              setUserData({
                ...userData,
                name: event.target.value,
              });
            }
          }
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          required
          value={userData.email}
          onChange={
            (event) => {
              setUserData({
                ...userData,
                email: event.target.value,
              });
            }
          }
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          required
          value={userData.text}
          onChange={
            (event) => {
              setUserData({
                ...userData,
                text: event.target.value,
              });
            }
          }
          name="body"
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
  onCommentAdd: PropTypes.func.isRequired,
};

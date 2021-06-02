import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [valid, setValid] = useState(true);
  const handleForm = () => {
    if (name && email && body) {
      onAddComment({
        name,
        email,
        body,
      });
      setName('');
      setEmail('');
      setBody('');
    } else {
      setValid(false);
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setValid(true);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setValid(true);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setValid(true);
          }}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={handleForm}
      >
        Add a comment
      </button>
      {!valid && (
        <span style={{
          color: 'red',
          fontSize: '14px',
        }}
        >
          Fill  all  fields
        </span>
      )}
    </form>
  );
};

NewCommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

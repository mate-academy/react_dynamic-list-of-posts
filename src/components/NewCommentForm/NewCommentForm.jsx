import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ createComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearInputs = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(_event) => {
        _event.preventDefault();
        if (name && email && body) {
          createComment({
            name,
            email,
            body,
          });
        }

        clearInputs();
      }
    }
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={_event => setName(_event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={_event => setEmail(_event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={_event => setBody(_event.target.value)}
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
  createComment: PropTypes.func.isRequired,
};

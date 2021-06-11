import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = ({ onAdd }) => {
  const [newName, setName] = useState('');
  const [newEmail, setEmail] = useState('');
  const [newBody, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    onAdd(newName, newEmail, newBody);

    clear();
  };

  const clear = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <>
      <form
        className="NewCommentForm"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={newName}
            required
            onChange={event => (
              setName(event.target.value)
            )}
            className="NewCommentForm__input"
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="email"
            value={newEmail}
            required
            onChange={event => (
              setEmail(event.target.value)
            )}
            placeholder="Your email"
            className="NewCommentForm__input"
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            value={newBody}
            placeholder="Type comment here"
            required
            onChange={event => (
              setBody(event.target.value)
            )}
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

    </>
  );
};

NewCommentForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

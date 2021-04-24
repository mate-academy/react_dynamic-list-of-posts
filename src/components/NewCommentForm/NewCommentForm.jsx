import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export const NewCommentForm = React.memo(
  ({ loadComments }) => {
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newBody, setNewBody] = useState('');

    const handleChange = ({ target }) => {
      const { name, value } = target;

      // eslint-disable-next-line default-case
      switch (name) {
        case 'name':
          setNewName(value);
          break;
        case 'email':
          setNewEmail(value);
          break;
        case 'body':
          setNewBody(value);
          break;
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      loadComments(newName, newEmail, newBody);
      setNewName('');
      setNewEmail('');
      setNewBody('');
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="NewCommentForm"
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={newName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={newEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={newBody}
            onChange={handleChange}
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
  },
);

NewCommentForm.propTypes = {
  loadComments: PropTypes.func.isRequired,
};

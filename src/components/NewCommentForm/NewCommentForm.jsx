import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postComment }) => {
  const [nameQuery, setName] = useState('');
  const [emailQuery, setEmail] = useState('');
  const [bodyQuery, setBody] = useState('');
  const [hasOnlySpaces, setSpacesStatus] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
        break;
    }

    if (hasOnlySpaces) {
      setSpacesStatus(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      nameQuery.trim()
      && emailQuery.trim()
      && bodyQuery.trim()) {
      postComment([nameQuery, emailQuery, bodyQuery]);

      setName('');
      setEmail('');
      setBody('');
    }
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
          value={nameQuery}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailQuery}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyQuery}
          onChange={handleChange}
          required
        />
      </div>
      {hasOnlySpaces
        && (
          <div className="NewCommentForm__has-spaces">
            The fields cannot contain only spaces
          </div>
        )
      }

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
  postComment: PropTypes.func.isRequired,
};

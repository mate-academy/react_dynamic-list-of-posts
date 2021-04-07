import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, grabUpdatedInfo }) => {
  const [newName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'body':
        return setBody(value);

      default: {
        return null;
      }
    }
  };

  const onSumbit = (event) => {
    event.preventDefault();

    const newComment = {
      postId: selectedPostId,
      name: newName,
      email,
      body,
    };

    grabUpdatedInfo(newComment);
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      onSubmit={onSumbit}
      className="NewCommentForm"
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={newName}
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
    </form>
  );
};

NewCommentForm.propTypes = {
  selectedPostId: PropTypes.number,
  grabUpdatedInfo: PropTypes.func.isRequired,
};

NewCommentForm.defaultProps = {
  selectedPostId: 0,
};

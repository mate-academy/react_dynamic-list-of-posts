import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment, getComments } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPost, editComment }) => {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleChange = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        setBody(value);
    }
  };

  const clearForm = () => {
    setBody('');
    setEmail('');
    setName('');
  };

  const onSubmit = async(event) => {
    event.preventDefault();

    await addComment(userName, email, body, selectedPost);
    await getComments(selectedPost)
      .then(editComment);

    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
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
  selectedPost: PropTypes.number.isRequired,
  editComment: PropTypes.func.isRequired,
};

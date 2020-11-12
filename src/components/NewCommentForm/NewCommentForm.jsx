import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!name || !email.includes('@') || !body) {
      return;
    }

    await addComment(selectedPostId, name, email, body);
    updateComments();
    setBody('');
  };

  const handleChange = (event) => {
    const {name, value} = event.target;

    switch(name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "body":
        setBody(value);
        break;
    }
  }

  return(
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
          value={name}
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
}

NewCommentForm.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  updateComments: PropTypes.func.isRequired,
};

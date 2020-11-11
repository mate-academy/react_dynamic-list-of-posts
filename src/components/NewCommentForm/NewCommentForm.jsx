import React, { useState } from 'react';
import { NewCommentFormProps } from '../../props/NewCommentFormProps';
import './NewCommentForm.scss';

export const NewCommentForm = ({ addComment }) => {
  const defaultComment = {
    name: '',
    email: '',
    body: '',
  };

  const [commentProperties, setCommentProperties] = useState(defaultComment);

  function onChange({ target }) {
    const { name, value } = target;

    setCommentProperties(properties => ({
      ...properties,
      [name]: value,
    }));
  }

  function onSubmit(event) {
    event.preventDefault();

    addComment(commentProperties);

    setCommentProperties(defaultComment);
  }

  return (
    <form
      className="NewCommentForm"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentProperties.name}
          onChange={onChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentProperties.email}
          onChange={onChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentProperties.body}
          onChange={onChange}
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

NewCommentForm.propTypes = NewCommentFormProps;

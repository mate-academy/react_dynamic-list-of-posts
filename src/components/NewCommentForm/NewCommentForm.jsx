import React, { useCallback, useState } from 'react';
import { NewCommentFormProps } from '../../props/NewCommentFormProps';
import './NewCommentForm.scss';

export const NewCommentForm = ({ addComment }) => {
  const defaultComment = {
    name: '',
    email: '',
    body: '',
  };

  const [commentProperties, setCommentProperties] = useState(defaultComment);

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;

      setCommentProperties(properties => ({
        ...properties,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      addComment(commentProperties);

      setCommentProperties(defaultComment);
    },
    [addComment, commentProperties, defaultComment],
  );

  return (
    <form
      className="NewCommentForm"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentProperties.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentProperties.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentProperties.body}
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

NewCommentForm.propTypes = NewCommentFormProps;

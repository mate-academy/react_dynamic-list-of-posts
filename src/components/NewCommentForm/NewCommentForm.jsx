import React, { useState } from 'react';
import { pushPostComments } from '../../api/comments';
import './NewCommentForm.scss';

export const NewCommentForm = ({ selectedPostId, grabUpdatedInfo }) => {
  const [newName, setName] = useState({});
  const [email, setEmail] = useState({});
  const [body, setBody] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        return setName({ [name]: value });
      case 'email':
        return setEmail({ [name]: value });
      case 'body':
        return setBody({ [name]: value });

      default: {
        return null;
      }
    }
  };

  const onSumbit = (event) => {
    event.preventDefault();

    const newComment = {
      postId: selectedPostId,
      ...newName,
      ...email,
      ...body,
    };

    grabUpdatedInfo(newComment);

    return newComment;
  };

  return (
    <form onSubmit={onSumbit} className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
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

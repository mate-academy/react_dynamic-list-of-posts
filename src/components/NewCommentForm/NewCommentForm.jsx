import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uploadComment } from '../../api/api';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, comments, addComment }) => {
  const [postProperties, setPostProperties] = useState({
    name: '',
    email: '',
    body: '',
  });

  const clearForm = () => {
    setPostProperties({
      name: '',
      email: '',
      body: '',
    });
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setPostProperties(prevPostState => ({
      ...prevPostState,
      [name]: value,
    }));
  };

  const formSubmitHadler = (event) => {
    event.preventDefault();

    const createdComment = {
      id: (comments.length > 0
        ? Math.max(...comments.map(comment => comment.id)) + 1
        : 1
      ),
      postId,
      name: postProperties.name,
      email: postProperties.email,
      body: postProperties.body,
      createdAt: String(new Date()),
      updatedAt: String(new Date()),
    };

    addComment(createdComment);
    uploadComment(createdComment);
    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={formSubmitHadler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={postProperties.name}
          onChange={inputHandler}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={postProperties.email}
          onChange={inputHandler}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={postProperties.body}
          onChange={inputHandler}
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
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  addComment: PropTypes.func.isRequired,
};

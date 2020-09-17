import React, { useState } from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';
import { addComment, getComments } from '../../api/comments';

export const NewCommentForm = ({ selectedPost, setComments }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.postId = selectedPost;

    if (!formData.name || !formData.email || !formData.body) {
      return;
    }

    addComment(formData)
      .then(() => getComments(selectedPost)
        .then(setComments));

    setFormData({
      name: '',
      email: '',
      body: '',
    });
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
          value={formData.name}
          className="NewCommentForm__input"
          onChange={({ target }) => setFormData(prevData => ({
            ...prevData,
            name: target.value.trimLeft(),
          }))}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={formData.email}
          className="NewCommentForm__input"
          onChange={({ target }) => setFormData(prevData => ({
            ...prevData,
            email: target.value.trimLeft(),
          }))}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={formData.body}
          className="NewCommentForm__input"
          onChange={({ target }) => setFormData(prevData => ({
            ...prevData,
            body: target.value.trimLeft(),
          }))}
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
  setComments: PropTypes.func.isRequired,
};

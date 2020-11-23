import React from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({
  addComment,
  selectedPostId,
  updateCommentsForPost,
}) => {
  const form = document.AddComment;

  return (
    <form className="NewCommentForm" name="AddComment">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>
      <button
        type="submit"
        method="POST"
        className="NewCommentForm__submit-button button"
        onClick={async(event) => {
          event.preventDefault();
          await addComment({
            method: 'POST',
            body: JSON.stringify({
              postId: selectedPostId,
              name: form.name.value,
              email: form.email.value,
              body: form.body.value,
            }),
            headers: { 'Content-type': 'application/json; charset=utf-8' },
          });

          form.name.value = '';
          form.email.value = '';
          form.body.value = '';
          updateCommentsForPost();
        }}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  selectedPostId: PropTypes.string.isRequired,
  updateCommentsForPost: PropTypes.func.isRequired,
};

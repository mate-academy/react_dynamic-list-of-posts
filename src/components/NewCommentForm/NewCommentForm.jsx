import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';

export const NewCommentForm = ({ addComment }) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [validate, setValidate] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!commentName.trim() || !commentEmail.trim() || !commentBody.trim()) {
      setValidate(false);

      return;
    }

    addComment(commentName, commentEmail, commentBody);
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
    setValidate(true);
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
          value={commentName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => {
            setCommentName(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={commentEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            setCommentEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={commentBody}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
        />
      </div>

      {!validate && (
        <p className="NewCommentForm__error">
          Form should not have empty fields.
        </p>
      )}

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
  addComment: PropTypes.func.isRequired,
};

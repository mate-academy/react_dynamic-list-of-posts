import React, { useState } from 'react';
import './NewCommentForm.scss';

export const NewCommentForm = ({ addNewComment }) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    addNewComment(commentName, commentEmail, commentBody);

    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
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
          className="NewCommentForm__input"
          required
          value={commentName}
          onChange={event => setCommentName(event.target.value)}
        />
      </div>
  
      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={commentEmail}
          onChange={event => setCommentEmail(event.target.value)}
        />
      </div>
  
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={commentBody}
          onChange={event => setCommentBody(event.target.value)}
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

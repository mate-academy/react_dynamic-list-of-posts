import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  handleAddComment: (arg0: string, ar1: string, arg2: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({ handleAddComment }) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        handleAddComment(
          newCommentName,
          newComment,
          newCommentEmail,
        );
        setNewCommentName('');
        setNewCommentEmail('');
        setNewComment('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newCommentName}
          required
          onChange={(event) => setNewCommentName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newCommentEmail}
          required
          onChange={(event) => setNewCommentEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
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

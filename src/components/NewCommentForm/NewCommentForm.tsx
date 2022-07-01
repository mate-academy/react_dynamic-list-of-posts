import React, { useState } from 'react';
import './NewCommentForm.scss';
import { NewComment } from '../../react-app-env';

interface Props {
  selectedPostId: number;
  onAddComment: (newComment: NewComment) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddComment,
}) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentBody, setNewCommentBody] = useState('');

  const clearForm = () => {
    setNewCommentName('');
    setNewCommentEmail('');
    setNewCommentBody('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment: NewComment = {
      postId: selectedPostId,
      name: newCommentName,
      email: newCommentEmail,
      body: newCommentBody,
    };

    onAddComment(newComment);
    clearForm();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={newCommentName}
          onChange={event => setNewCommentName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={newCommentEmail}
          onChange={event => setNewCommentEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={newCommentBody}
          onChange={event => setNewCommentBody(event.target.value)}
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

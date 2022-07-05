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
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBody, setNewBody] = useState('');

  const clearForm = () => {
    setNewName('');
    setNewEmail('');
    setNewBody('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment: NewComment = {
      postId: selectedPostId,
      name: newName,
      email: newEmail,
      body: newBody,
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
          value={newName}
          onChange={event => setNewName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={newEmail}
          onChange={event => setNewEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={newBody}
          onChange={event => setNewBody(event.target.value)}
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

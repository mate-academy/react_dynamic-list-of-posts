import React, { useState } from 'react';
import './NewCommentForm.scss';
import { nanoid } from 'nanoid';
import { Comment } from '../../types/comment';

type Props = {
  postId: number;
  addNewComment: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newBody, setNewBody] = useState<string>('');

  const newComment: Comment = {
    postId,
    id: +nanoid(),
    name: newName,
    email: newEmail,
    body: newBody,
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewComment(newComment);
    setNewName('');
    setNewEmail('');
    setNewBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          value={newName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="text"
          name="email"
          value={newEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          value={newBody}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => {
            setNewBody(event.target.value);
          }}
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

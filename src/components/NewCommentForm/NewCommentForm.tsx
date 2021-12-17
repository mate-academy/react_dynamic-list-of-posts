import React, { useState } from 'react';
import './NewCommentForm.scss';
import { nanoid } from 'nanoid';
import { Comment } from '../../types/types';

type Props = {
  postId: number;
  addNewComment: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newBody, setNewBody] = useState<string>('');
  const [formError, setFormError] = useState<boolean>(false);

  const newComment: Comment = {
    postId,
    id: +nanoid(),
    name: newName,
    email: newEmail,
    body: newBody,
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (newComment.name && newComment.body && newComment.email) {
      addNewComment(newComment);
      setNewName('');
      setNewEmail('');
      setNewBody('');
    } else {
      setFormError(true);
    }
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={newName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            setNewName(event.target.value);
            setFormError(false);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={newEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            setNewEmail(event.target.value);
            setFormError(false);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={newBody}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => {
            setNewBody(event.target.value);
            setFormError(false);
          }}
        />
      </div>

      <button
        type="submit"
        className={!formError
          ? 'NewCommentForm__submit-button button'
          : 'NewCommentForm__submit-button button--formError'}
        disabled={formError}
        onClick={(event) => handleSubmit(event)}
      >
        Add a comment
      </button>

      {formError && (
        <p className="FormError">FIELDS CANNOT BE EMPTY</p>
      )}
    </form>
  );
};

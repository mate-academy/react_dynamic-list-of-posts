import React, { useState } from 'react';

import './NewCommentForm.scss';

import { postNewComment } from '../../api/comments';

type Props = {
  postId: number | null;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [newCommentName, setNewCommentName] = useState<string>('');
  const [newCommentEmail, setNewCommentEmail] = useState<string>('');
  const [newCommentBody, setNewCommentBody] = useState<string>('');

  const onNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentName(event.target.value);
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postNewComment({
      postId,
      name: newCommentName,
      email: newCommentEmail,
      body: newCommentBody,
    });
    setNewCommentEmail('');
    setNewCommentBody('');
    setNewCommentName('');
  };

  return (
    <form
      onSubmit={event => onSubmitForm(event)}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          value={newCommentName}
          onChange={onNewName}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={newCommentEmail}
          onChange={(event) => setNewCommentEmail(event.target.value)}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={newCommentBody}
          onChange={(event) => setNewCommentBody(event.target.value)}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

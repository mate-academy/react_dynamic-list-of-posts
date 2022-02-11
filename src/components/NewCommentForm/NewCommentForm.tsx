import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

type Props = {
  postId: number;
  getUserComments: () => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  getUserComments,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');

  const clearInputs = () => {
    setUserName('');
    setUserEmail('');
    setUserComment('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await addComment(postId, userName, userEmail, userComment);
    await getUserComments();

    clearInputs();
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
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={event => setUserEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={userComment}
          onChange={event => setUserComment(event.target.value)}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={handleSubmit}
      >
        Add a comment
      </button>
    </form>
  );
};

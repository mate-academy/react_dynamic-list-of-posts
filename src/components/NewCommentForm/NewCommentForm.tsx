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
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputComment, setInputComment] = useState('');

  const clearInputs = () => {
    setInputName('');
    setInputEmail('');
    setInputComment('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addComment(postId, inputName, inputEmail, inputComment);
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
          value={inputName}
          onChange={event => setInputName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={inputEmail}
          onChange={event => setInputEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={inputComment}
          onChange={event => setInputComment(event.target.value)}
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

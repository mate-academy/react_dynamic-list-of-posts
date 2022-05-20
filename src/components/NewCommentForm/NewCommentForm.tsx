import React, { useState } from 'react';

import { Comment } from '../../types/Comment';

import { addComment } from '../../api/comments';

import './NewCommentForm.scss';

type Props = {
  getComments: () => Promise<void>;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  getComments,
  postId,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputComment, setInputComment] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputName || !inputEmail || !inputComment) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId,
      name: inputName,
      email: inputEmail,
      body: inputComment,
    };

    await addComment(newComment);
    await getComments();

    setInputName('');
    setInputEmail('');
    setInputComment('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={inputName}
          onChange={({ target }) => {
            setInputName(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={inputEmail}
          onChange={({ target }) => {
            setInputEmail(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={inputComment}
          onChange={({ target }) => {
            setInputComment(target.value);
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

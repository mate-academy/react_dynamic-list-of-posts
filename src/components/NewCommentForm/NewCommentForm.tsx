import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  postId: number,
}

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const emptyComment: ServerComment = {
    name: '',
    email: '',
    body: '',
    id: 1,
    postId,
  };

  const [comment, setComment] = useState<ServerComment>(emptyComment);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const COMMENTS_URL = 'https://mate.academy/students-api/comments';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(comment),
    };

    setComment(emptyComment);
    fetch(COMMENTS_URL, options);
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={handleInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={handleInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={handleInput}
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

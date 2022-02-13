import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number,
}

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const emptyComment: ServerComment = {
    name: '',
    email: '',
    body: '',
    id: 2,
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addComment(comment);
    setComment(emptyComment);
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

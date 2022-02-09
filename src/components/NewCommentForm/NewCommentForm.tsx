import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  onAddComment: (newComment: NewComment) => void;
  selectedPostId: number;
}

export const NewCommentForm: React.FC<Props> = ({ onAddComment, selectedPostId }) => {
  const initialComment = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const [comment, setComment] = useState<NewComment>(initialComment);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,

    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAddComment(comment);
    setComment(initialComment);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="NewCommentForm"
      method="post"
    >
      <div className="form-field">
        <input
          onChange={handleInputChange}
          value={comment.name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          onChange={handleInputChange}
          value={comment.email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          onChange={handleInputChange}
          value={comment.body}
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

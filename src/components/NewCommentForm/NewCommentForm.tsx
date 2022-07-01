import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onAdd: (comment: NewComment) => void,
};

export const NewCommentForm: React.FC<Props> = ({ onAdd }) => {
  const newComment = {
    name: '',
    email: '',
    body: '',
  };

  const [comment, setComment] = useState<NewComment>(newComment);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.name === 'name') {
      comment.name = event.target.value;
    } else {
      comment.email = event.target.value;
    }
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    comment.body = event.target.value;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setComment(newComment);
    onAdd(comment);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
      method="post"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={handleChangeText}
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

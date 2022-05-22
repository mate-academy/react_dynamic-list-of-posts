import React, { ChangeEvent, FormEvent, useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  handleAddComment: (x: NewComment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  handleAddComment,
}) => {
  const initialState = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const [newComment, setNewComment] = useState(initialState);

  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;

    setNewComment(prev => ({ ...prev, [name]: value, postId: selectedPostId }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleAddComment(newComment);
    setNewComment(initialState);
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
          onChange={handleInput}
          value={newComment.name}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleInput}
          value={newComment.email}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleInput}
          value={newComment.body}
          required
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

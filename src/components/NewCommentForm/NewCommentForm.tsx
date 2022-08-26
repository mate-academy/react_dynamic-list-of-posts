import React, { useEffect, useState } from 'react';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: string;
  loadData: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  loadData,
}) => {
  const initialNewComment = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const [newComment, setNewComment] = useState(initialNewComment);

  useEffect(() => {
    setNewComment(initialNewComment);
  },
  [selectedPostId]);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
  };

  const newCommentFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    createComment(newComment).then(() => loadData());
    setNewComment(initialNewComment);
  };

  return (
    <form
      className="NewCommentForm"
      method="POST"
      onSubmit={newCommentFormSubmit}
    >
      {`postId: ${selectedPostId}`}
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input NewCommentForm__input--textarea"
          value={newComment.body}
          onChange={inputChangeHandler}
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

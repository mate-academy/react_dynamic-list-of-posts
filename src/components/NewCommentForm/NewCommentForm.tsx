import React, { useEffect, useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  loadComments: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, loadComments }) => {
  const [newComment, setNewComment] = useState<NewComment>({
    postId,
    name: '',
    email: '',
    body: '',
  });

  useEffect(() => {
    setNewComment(current => ({
      ...current,
      postId,
    }));
  }, [postId]);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setNewComment(current => ({
      ...current,
      [name]: value,
    }));
  };

  const clearComment = () => {
    setNewComment({
      postId,
      name: '',
      email: '',
      body: '',
    });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await addComment(newComment);
    loadComments();
    clearComment();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={newComment.name}
          onChange={handleChangeField}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={newComment.email}
          onChange={handleChangeField}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={newComment.body}
          onChange={handleChangeField}
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

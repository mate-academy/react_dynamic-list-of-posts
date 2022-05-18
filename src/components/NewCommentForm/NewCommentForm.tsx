import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/comment';

type Props = {
  selectedPostId: number,
  commentsLength:number,
  addComment: (newComment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  commentsLength,
  addComment,
}) => {
  const [newId, setNewId] = useState(commentsLength);

  const [createComment, setCreateComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleChange = (
    event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setCreateComment(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setCreateComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    setNewId((prev) => prev + 1);

    if (createComment) {
      const newComment: Comment = {
        id: newId,
        postId: selectedPostId,
        ...createComment,
      };

      addComment(newComment);
      resetForm();
    }
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
          value={createComment.name}
          required
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={createComment.email}
          required
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={createComment.body}
          required
          onChange={handleChange}
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

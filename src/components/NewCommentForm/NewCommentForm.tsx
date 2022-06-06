import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  commentsLength: number,
  handleAddComment : (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  handleAddComment,
  selectedPostId,
  commentsLength,
}) => {
  const [id, setId] = useState(commentsLength);
  const [makeComment, setMakeComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setMakeComment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setMakeComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setId((prev => prev + 1));

    if (makeComment) {
      const newComment: Comment = {
        id,
        postId: selectedPostId,
        ...makeComment,
      };

      handleAddComment(newComment);
      reset();
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
          value={makeComment.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={makeComment.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={makeComment.body}
          onChange={handleChange}
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

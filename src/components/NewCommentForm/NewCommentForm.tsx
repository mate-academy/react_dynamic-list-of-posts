import React, { useState } from 'react';
import { addNewComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number | undefined;
  updateComment: () => void
};

type Event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export const NewCommentForm: React.FC<Props> = (props) => {
  const { selectedPostId, updateComment } = props;
  const initialComment = {
    postId: selectedPostId,
    name: '',
    body: '',
    email: '',
  };
  const [comment, setComment] = useState<Partial<Comment>>(initialComment);

  const handleChange = (event: Event) => {
    const { name, value } = event.target;

    setComment({
      ...comment,
      [name]: value,
    } as keyof Comment);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addNewComment(comment);
    setComment(initialComment);
    updateComment();
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
          value={comment.name}
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={comment.email}
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

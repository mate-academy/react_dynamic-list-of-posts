import React, { useState } from 'react';
import { addPostComment } from '../../api/comments';

import './NewCommentForm.scss';

type Props = {
  postId: number;
  reloadPost: () => void;
};

type NewPostComment = Pick<PostComment, 'name' | 'email' | 'body'>;

const initialComment: NewPostComment = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({ postId, reloadPost }) => {
  const [newComment, setNewComment] = useState<NewPostComment>(initialComment);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addPostComment({
      postId,
      ...newComment,
    });

    setNewComment(initialComment);

    reloadPost();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setNewComment(prevComment => ({
      ...prevComment,
      [name]: value,
    }));
  };

  return (
    <form
      method="post"
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={newComment.name}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={newComment.body}
          onChange={handleInputChange}
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

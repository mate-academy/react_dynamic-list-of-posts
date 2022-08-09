import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/comment';

interface NewComment {
  name: string;
  email: string;
  body: string;
}

type Props = {
  addNewComment: (args0: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  addNewComment,
}) => {
  const [newComment, setNewComment] = useState<NewComment>({
    name: '',
    email: '',
    body: '',
  });

  const handleChange = (propName: string, propValue: string) => {
    const updatedComment = {
      ...newComment,
      [propName]: propValue,
    };

    setNewComment(updatedComment);
  };

  const submitNewComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const comment = {
      ...newComment,
      id: Math.random(),
      postId: Math.random() + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addNewComment(comment);
  };

  return (
    <form
      className="NewCommentForm"
      method="POST"
      onSubmit={submitNewComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={({ target: { name, value } }) => handleChange(name, value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={({ target: { name, value } }) => handleChange(name, value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment.body}
          onChange={({ target: { name, value } }) => handleChange(name, value)}
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

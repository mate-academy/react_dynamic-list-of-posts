import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/comment';

interface Props {
  addComment: (newComment: Comment) => void;
  selectedPost: number;
}

export const NewCommentForm: React.FC<Props> = ({
  addComment, selectedPost,
}) => {
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const resetComment = () => {
    setBody('');
    setEmail('');
    setName('');
  };

  const sumbitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addComment({
      id: Math.random(),
      name,
      email,
      body,
      postId: selectedPost,
      createdAt: new Date(),
    });
    resetComment();
  };

  return (
    <form className="NewCommentForm" onSubmit={sumbitChange}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          onChange={(event) => setBody(event.target.value)}
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

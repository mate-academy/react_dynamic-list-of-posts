import React, { useState } from 'react';
import './NewCommentForm.scss';
import { createComment } from '../../api/comments';

interface Props {
  comments: Comment[];
  postId: number;
}

export const NewCommentForm: React.FC<Props> = (props) => {
  const { comments, postId } = props;
  const [queryName, setQueryName] = useState('');
  const [queryEmail, setQueryEmail] = useState('');
  const [queryComment, setQueryComment] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setQueryName(value);
        break;

      case 'email':
        setQueryEmail(value);
        break;

      case 'comment':
        setQueryComment(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment = {
      id: comments.length,
      postId,
      name: queryName,
      email: queryEmail,
      body: queryComment,
    };

    setQueryComment('');
    setQueryEmail('');
    setQueryName('');

    createComment(newComment as Comment);
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={queryName}
          onChange={handleChange}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={queryEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="comment"
          value={queryComment}
          onChange={handleChange}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};

import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/Comment';

type Props = {
  addNewComment: (newComment: Partial<Comment>) => void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment, postId }) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      postId,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    };

    addNewComment(newComment);

    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={handleFormSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={commentName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={event => {
            setCommentName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={commentEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => {
            setCommentEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={commentBody}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => {
            setCommentBody(event.target.value);
          }}
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

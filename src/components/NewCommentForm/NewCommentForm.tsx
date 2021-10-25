import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  addNewComment: (comment: CommentTypes) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [name, setCommentName] = useState('');
  const [email, setCommentEmail] = useState('');
  const [body, setCommentBody] = useState('');

  const createComment = () => {
    return {
      postId,
      name,
      email,
      body,
    };
  };

  const clearInputs = () => {
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newComment = createComment();

    addNewComment(newComment as CommentTypes);
    clearInputs();
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
          value={name}
          onChange={event => setCommentName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setCommentEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => setCommentBody(event.target.value)}
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

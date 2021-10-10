import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  addAnotherComment: (anotherComment: Partial<Comment>) => void;
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, addAnotherComment } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setComment('');
  };

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();
    addAnotherComment({
      postId,
      name,
      email,
      body: comment,
    });
    reset();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Type comment here"
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

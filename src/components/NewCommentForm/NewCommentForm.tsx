import React, { useState } from 'react';
import './NewCommentForm.scss';

// interface NewCommentFormProps {
//   comments: Comment[];
// }

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  // let newComment: NewComment;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // newComment = { name, email, body: comment };
    // comments.push('newComment');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          value={comment}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setComment(event.target.value)}
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

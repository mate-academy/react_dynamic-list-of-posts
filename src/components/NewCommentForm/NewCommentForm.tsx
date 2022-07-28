import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  onAddComment: (name: string, email: string, body: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  // eslint-disable-next-line max-len
  const sendComment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    onAddComment(name, email, comment);
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={sendComment}
      >
        Add a comment
      </button>
    </form>
  );
};

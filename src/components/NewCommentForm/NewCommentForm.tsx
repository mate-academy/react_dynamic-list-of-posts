import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../Types/Comment';

type Props = {
  addNewComment: (newComment: Comment) => void;
  selectedPost: number,
};

export const NewCommentForm: React.FC<Props> = ({
  addNewComment,
  selectedPost,
}) => {
  const [nameText, setNameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [bodyText, setBodyText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment = {
      postId: selectedPost,
      id: Date.now(),
      name: nameText,
      email: emailText,
      body: bodyText,
    };

    addNewComment(newComment);
    setNameText('');
    setEmailText('');
    setBodyText('');
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          value={nameText}
          onChange={(event) => setNameText(event.target.value)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={emailText}
          onChange={(event) => setEmailText(event.target.value)}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={bodyText}
          onChange={(event) => setBodyText(event.target.value)}
          required
          name="body"
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

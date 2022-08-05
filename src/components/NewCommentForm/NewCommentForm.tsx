import React, { useState } from 'react';
import './NewCommentForm.scss';
import { postComment } from '../../api/api';
import { Comment } from '../../types/Comment';

type Props = {
  postId: number | undefined;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const sendCommentHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.length && email.length && description.length) {
      const newComment: Comment = {
        postId,
        name,
        email,
        body: description,
      };

      postComment(newComment);
      setName('');
      setEmail('');
      setDescription('');
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={sendCommentHandler}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

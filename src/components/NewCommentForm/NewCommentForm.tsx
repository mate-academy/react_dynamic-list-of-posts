import React, { useState } from 'react';
import { addComment } from '../../api/api';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  loadComments: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, loadComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const postComment = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    addComment(postId, name, email, newComment)
      .then(loadComments)
      .then(() => {
        setName('');
        setEmail('');
        setNewComment('');
      });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={postComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          onChange={event => setName(event.currentTarget.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={event => setEmail(event.currentTarget.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={newComment}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={event => setNewComment(event.currentTarget.value)}
          required
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

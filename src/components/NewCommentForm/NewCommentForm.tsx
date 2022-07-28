import React, { useState } from 'react';
import { addPostComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

interface Props {
  selectedPostId: number,
  createComment: (newComment: Comment) => void,
}

export const NewCommentForm: React.FC<Props> = (
  { selectedPostId, createComment },
) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const postId = selectedPostId;

  const addNewComment = () => {
    const newComment: Comment = {
      postId,
      name,
      email,
      body,
      id: Math.floor(Date.now() / 1000),
    };

    addPostComment(newComment);
    createComment(newComment);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addNewComment();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
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

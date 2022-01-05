import React, { useState } from 'react';
import { Post } from '../../Types/Post';
import { Comment } from '../../Types/Comment';
import './NewCommentForm.scss';

type Props = {
  postId: Post['id'];
  addComment: (newComment: Comment) => void;
  commentId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment, commentId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addComment({
      id: commentId,
      postId,
      name,
      email,
      body,
    });

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSumbit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          className="NewCommentForm__input"
          required
          onChange={({ target }) => setBody(target.value)}

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

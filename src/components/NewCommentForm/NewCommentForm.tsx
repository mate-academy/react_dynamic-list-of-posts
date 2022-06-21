import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';
import { Post, Comment } from '../../react-app-env';

type Props = {
  post: Post,
  comments: Comment[],
  onRequest: () => void,
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  comments,
  onRequest,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newComment = {
      id: comments.length + 1,
      postId: post.id,
      name,
      email,
      body,
    };

    await addComment(newComment);
    onRequest();
    setName('');
    setEmail('');
    setBody('');
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
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
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

import React, { useState, useEffect } from 'react';
import { commentPostComments } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number,
  handlePostComments: any,
}

export const NewCommentForm: React.FC<Props> = ({ postId, handlePostComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    commentPostComments({
      postId,
      name,
      email,
      body,
    });

    setTimeout(() => {
      handlePostComments();
      setName('');
      setEmail('');
      setBody('');
    }, 100);
  };

  useEffect(() => {
    setName('');
    setEmail('');
    setBody('');
  }, [postId]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
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
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

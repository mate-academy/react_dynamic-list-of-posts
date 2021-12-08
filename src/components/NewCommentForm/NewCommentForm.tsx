import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

type Props = {
  addNewComment: (newComment: Comment) => void,
  selectedPostId: number,
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment, selectedPostId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const setValue = (e: any, fun: (ar: string) => void) => {
    fun(e.target.value);
  };

  const submitChange = (event: React.FormEvent) => {
    event.preventDefault();

    addNewComment({
      name,
      email,
      body,
      postId: selectedPostId,
    } as Comment);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitChange}
    >
      <div className="form-field">
        <input
          type="text"
          required
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => setValue(e, setName)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          required
          value={email}
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => setValue(e, setEmail)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          required
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => setValue(e, setBody)}
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

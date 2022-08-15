import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  changeCount: number,
  onAdd: React.Dispatch<React.SetStateAction<number>>,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  changeCount,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setText] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addComment({
      postId,
      name,
      email,
      body,
    }).then(() => onAdd(changeCount + 1));
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={e => setText(e.target.value)}
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

import React, { useState } from 'react';
import './NewCommentForm.scss';
import { createComment } from '../../api/comments';

type Props = {
  id: number | undefined,
  loadComments: () => void,
};

export const NewCommentForm: React.FC<Props> = ({ id = 0, loadComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const updateComents = async () => {
    await createComment(id, name, email, body);
    loadComments();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && email && body) {
      updateComents();
      setName('');
      setEmail('');
      setBody('');
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
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

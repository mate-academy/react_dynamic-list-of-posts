import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  onCommentAdd: (value: Partial<PostComment>) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onCommentAdd,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleNewCommentSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    onCommentAdd({
      postId,
      name,
      email,
      body,
    });

    clearForm();
  };

  return (
    <form onSubmit={handleNewCommentSubmit} className="NewCommentForm">
      <div className="form-field">
        <input
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          onChange={(e) => setBody(e.currentTarget.value)}
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
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

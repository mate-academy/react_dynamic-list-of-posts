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

  const clear = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const submitComment: React.FormEventHandler = (event) => {
    event.preventDefault();

    onCommentAdd({
      postId,
      name,
      email,
      body,
    });

    clear();
  };

  return (
    <form onSubmit={submitComment} className="NewCommentForm">
      <div className="form-field">
        <input
          onChange={(event) => setName(event.currentTarget.value)}
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
          onChange={(event) => setEmail(event.currentTarget.value)}
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
          onChange={(event) => setBody(event.currentTarget.value)}
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button is-info"
      >
        Add a comment
      </button>
    </form>
  );
};

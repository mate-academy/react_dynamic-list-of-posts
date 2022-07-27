import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  onSubmit(
    event: React.FormEvent<HTMLFormElement>,
    newComment: NewComment
  ): void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit(
      event,
      {
        name,
        email,
        body,
        postId,
      },
    );

    setBody('');
    setEmail('');
    setName('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleOnSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => setBody(event.target.value)}
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

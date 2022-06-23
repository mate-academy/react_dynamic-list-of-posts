import React, { useState } from 'react';
import './NewCommentForm.scss';
import { createComment } from '../../api/comments';

type Props = {
  postId: number | null,
  commentsFromServer: (id: number | null) => void
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  commentsFromServer,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const commentAdder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const commentToSend: NewComment = {
      postId,
      name,
      email,
      body,
    };

    createComment(commentToSend);
    setName('');
    setEmail('');
    setBody('');
    commentsFromServer(postId);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        commentAdder(event);
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
          required
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
          required
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

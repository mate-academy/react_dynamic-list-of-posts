import React, { useState } from 'react';
import './NewCommentForm.scss';
import { createComment } from '../../api/comments';

type Props = {
  postId: number | null
  comments: IComment[] | null
  setComments: (comment: IComment[] | null) => void
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const addNewComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const addComment: IComment = {
      postId,
      id: comments && comments.length + 1,
      name,
      email,
      body,

    };

    createComment(addComment);
    setBody('');
    setEmail('');
    setName('');
    setComments(comments && [...comments, addComment]);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        addNewComment(event);
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

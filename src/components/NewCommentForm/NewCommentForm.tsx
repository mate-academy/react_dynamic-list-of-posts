import React, { useState } from 'react';
import './NewCommentForm.scss';

export type NewComment = {
  name: string,
  email: string,
  body: string,
};

type Props = {
  createNewComment: (newComment: NewComment) => void,
};

export const NewCommentForm: React.FC<Props> = ({ createNewComment }) => {
  const [comment, setComment] = useState<NewComment>({
    name: '',
    email: '',
    body: '',
  });

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        createNewComment(comment);
        setComment({ name: '', email: '', body: '' });
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setComment((currentComment: NewComment) => ({
              ...currentComment,
              name: target.value,
            }));
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={comment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setComment((currentComment: NewComment) => ({
              ...currentComment,
              email: target.value,
            }));
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => {
            setComment((currentComment: NewComment) => ({
              ...currentComment,
              body: target.value,
            }));
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

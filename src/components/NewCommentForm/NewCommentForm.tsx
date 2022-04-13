import React, { useState, ChangeEvent } from 'react';
import { addComments } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number | undefined,
  addNewComment: (newComment: Comments) => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const inputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    switch (event.target.name) {
      case 'name':
        setComment({
          name: value,
          email: comment.email,
          body: comment.body,
        });
        break;

      case 'email':
        setComment({
          name: comment.name,
          email: value,
          body: comment.body,
        });
        break;

      case 'body':
        setComment({
          name: comment.name,
          email: comment.email,
          body: value,
        });
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const addCommentsHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, body } = comment;

    if (postId) {
      addComments(postId, name, email, body)
        .then(response => {
          addNewComment(response);
        });
    }

    reset();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={addCommentsHandler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={inputHandler}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={inputHandler}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={inputHandler}
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

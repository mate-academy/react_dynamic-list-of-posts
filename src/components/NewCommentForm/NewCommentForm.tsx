import React, { useState } from 'react';
import './NewCommentForm.scss';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '../../api/comments';
import { Comment } from '../../types/Comment';

interface Props {
  onAdd: (comment: Comment) => void,
  postId: number,
}

export const NewCommentForm: React.FC<Props> = React.memo(({
  onAdd,
  postId,
}) => {
  const [newComment, setNewComment] = useState({
    id: '',
    name: '',
    email: '',
    body: '',
  });

  const {
    id, name, email, body,
  } = newComment;

  const handlerInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (event.target.name) {
      case 'id':
        setNewComment({
          id: uuidv4(),
          name,
          email,
          body,
        });
        break;

      case 'name':
        setNewComment({
          id,
          name: event.target.value,
          email,
          body,
        });
        break;

      case 'email':
        setNewComment({
          id,
          name,
          email: event.target.value,
          body,
        });
        break;

      case 'body':
        setNewComment({
          id,
          name,
          email,
          body: event.target.value,
        });
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setNewComment({
      id: '',
      name: '',
      email: '',
      body: '',
    });
  };

  const hendlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addComment(id, postId, name, email, body)
      .then((res: Comment) => {
        onAdd(res);
      });

    reset();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={hendlerSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={handlerInput}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handlerInput}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={handlerInput}
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
});

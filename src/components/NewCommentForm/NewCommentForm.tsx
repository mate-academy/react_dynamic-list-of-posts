import React, { useState } from 'react';
import { addComments } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number | undefined,
  addNewComment: (newComment: Comments) => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;

      case 'email':
        setEmail(event.target.value);
        break;

      case 'body':
        setBody(event.target.value);
        break;

      default:
        break;
    }
  };

  const addCommentsHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (postId) {
      addComments(postId, name, email, body)
        .then(response => {
          addNewComment(response);
        });
    }

    setName('');
    setEmail('');
    setBody('');
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
          value={name}
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
          value={email}
          onChange={inputHandler}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
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

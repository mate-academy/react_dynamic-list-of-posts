import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  addComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [commentValidation, isValid] = useState(true);

  const newComment: Comment = {
    id: Math.round(Math.random() * 1000),
    name,
    email,
    body,
    postId,
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const isCommentValid = ({ name: n, email: e, body: b }: Comment) => (
    n.trim() && e.trim() && b.trim()
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCommentValid(newComment)) {
      isValid(true);
      clearForm();
      addComment(newComment);
    } else {
      isValid(false);
    }
  };

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name: n } = event.target;
    const { value } = event.target;

    isValid(true);

    switch (n) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;
      default:
        break;
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          value={name}
          onChange={inputHandler}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          value={email}
          onChange={inputHandler}
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          onChange={inputHandler}
          rows={5}
          cols={23}
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
      {!commentValidation && (
        <p className="NewCommentForm--invalid">Comment is invalid</p>
      )}
    </form>
  );
};

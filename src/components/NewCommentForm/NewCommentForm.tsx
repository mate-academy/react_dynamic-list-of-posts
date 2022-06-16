import React, { useState } from 'react';
import { NewPostBody } from '../../types/Post';
import './NewCommentForm.scss';

type Props = {
  postComment: (preparedData: NewPostBody) => void;
};
// eslint-disable-next-line
const validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const NewCommentForm: React.FC<Props> = ({ postComment }) => {
  const formBlank = {
    name: '',
    email: '',
    body: '',
  };

  const [newComment, setNewComment] = useState(formBlank);
  const [isError, setIsError] = useState('');

  function handleChange(e:
  React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;

    setNewComment(prev => ({
      ...prev,
      [name]: value,
    }));

    setIsError('');
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const isFilled = Object.values(newComment);

    if (isFilled.some(field => field.trim() === '')) {
      setIsError('Fill in all fields');

      return;
    }

    if (!newComment.email.match(validationEmail)) {
      setIsError('Enter valid Email adress');

      return;
    }

    postComment(newComment);

    setNewComment(formBlank);
  }

  return (
    <form onSubmit={handleSubmit} className="NewCommentForm">
      <p>{isError}</p>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment.body}
          onChange={handleChange}
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

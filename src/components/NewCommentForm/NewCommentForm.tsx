import React, { FormEvent, useState } from 'react';
// import { BASE_URL } from '../../api/api';
import './NewCommentForm.scss';
import { createComment } from '../../api/comments';

type Props = {
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setComment('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createComment(postId, name, email, comment);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={async (e) => {
        try {
          await handleSubmit(e);
          reset();
        } catch (error) {
          throw new Error('Error happened');
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => {
            setComment(e.target.value);
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

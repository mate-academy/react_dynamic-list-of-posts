import React, { FormEvent, useState } from 'react';
import { BASE_URL } from '../../api/api';
import './NewCommentForm.scss';

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

    const response = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        postId,
        name,
        email,
        body: comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();

    return data;
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        handleSubmit(e);
        reset();
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

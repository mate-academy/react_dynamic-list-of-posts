import React, { FormEvent, useState } from 'react';
import { request } from '../../api/posts';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number,
  loadComments: () => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  loadComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const clear = () => {
    setName('');
    setEmail('');
    setComment('');
  };

  const addComment = (postId: number) => {
    return request(`/comments?postId=${postId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name,
        email,
        body: comment,
        postId,
      }),
    })
      .then(() => {
        loadComments();
        clear();
      });
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    addComment(selectedPostId);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
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

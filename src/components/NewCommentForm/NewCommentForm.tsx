import React, { useState } from 'react';
import { addPostComment } from '../../api/comments';
import { Comment } from '../../react-app-env';
import './NewCommentForm.scss';

interface Props {
  postId:number
  updateComments: () => void
}

export const NewCommentForm: React.FC<Props> = ({ postId, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const sendForm = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment:Comment = {
      postId,
      name,
      email,
      body: comment,
    };

    addPostComment(newComment).then(() => updateComments());
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <form
      className="NewCommentForm"
      method="post"
      onSubmit={sendForm}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input "
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input "
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          placeholder="Type comment here"
          className="NewCommentForm__input "
          onChange={(event) => {
            setComment(event.currentTarget.value);
          }}
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

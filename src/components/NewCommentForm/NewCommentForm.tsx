import React, { useState } from 'react';
import './NewCommentForm.scss';
import { NewComment } from '../../react-app-env';
import { addComment } from '../../api/comments';

interface Props {
  postId: number,
  getComments: () => void,
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  getComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment: NewComment = {
      postId,
      name,
      email,
      body,
    };

    await addComment(newComment);
    getComments();
    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          className="NewCommentForm__input"
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

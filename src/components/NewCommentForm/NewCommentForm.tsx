import React, { FormEvent, useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  onUpdateComments: () => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, onUpdateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const addNewComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment: Omit<PostComment, 'id'> = {
      name,
      email,
      body,
      postId,
    };

    clearForm();
    await addComment(newComment);
    await onUpdateComments();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={addNewComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          value={body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setBody(event.target.value)}
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

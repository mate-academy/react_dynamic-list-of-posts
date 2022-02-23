import React, { useState } from 'react';
import './NewCommentForm.scss';
import { postComment } from '../../api/comments';

type Props = {
  loadComments: () => void;
  selectedPostId: number;
};

export const NewCommentForm: React.FC<Props> = ({ loadComments, selectedPostId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const addNewComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await postComment(selectedPostId, name, email, commentBody);

    loadComments();
    setName('');
    setEmail('');
    setCommentBody('');
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
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={(event) => setCommentBody(event.target.value)}
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

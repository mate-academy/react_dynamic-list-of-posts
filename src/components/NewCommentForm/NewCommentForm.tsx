import React, { useState } from 'react';
import './NewCommentForm.scss';

import { Comment } from '../../types/Comment';

import { addComment, getPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number,
  setPostComments: (comments: Comment[] | null) => void,
  setIsLoadingComments: (status: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  setPostComments,
  setIsLoadingComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoadingComments(true);

    await addComment(selectedPostId, name, email, newComment);

    const result = await getPostComments(selectedPostId);

    setPostComments(result);

    setIsLoadingComments(false);
    setName('');
    setEmail('');
    setNewComment('');
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          required
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          required
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment}
          required
          onChange={({ target }) => setNewComment(target.value)}
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

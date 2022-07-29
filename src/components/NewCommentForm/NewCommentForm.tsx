import React, { useEffect, useState } from 'react';
import { createPostComment, getAllComments } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number,
  onRefreshComent: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewCommentForm = React.memo<Props>(({
  postId,
  onRefreshComent,
}) => {
  const [name, setNewName] = useState('');
  const [email, setNewEmail] = useState('');
  const [body, setNewBody] = useState('');
  const [id, setNewId] = useState(0);

  useEffect(() => {
    getAllComments()
      .then(comments => setNewId(Math.max(...comments
        .map(comment => comment.id)) + 1));
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createPostComment({
      id,
      postId,
      name,
      email,
      body,
    });

    setNewName('');
    setNewEmail('');
    setNewBody('');
    onRefreshComent(true);
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
          onChange={({ target }) => setNewName(target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={({ target }) => setNewEmail(target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={({ target }) => setNewBody(target.value)}
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
});

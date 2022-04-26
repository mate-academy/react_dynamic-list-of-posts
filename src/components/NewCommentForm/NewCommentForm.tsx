import React, { useCallback, useState } from 'react';
import { Comment } from '../../types';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  createComment: (comment: Omit<Comment, 'id'>) => void,
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  createComment,
  postId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (name && email && body) {
      const newComment = {
        name,
        email,
        body,
        postId,
      };

      createComment(newComment);
    }

    setName('');
    setEmail('');
    setBody('');
  }, [postId, name, email, body]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Type comment here"
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
});

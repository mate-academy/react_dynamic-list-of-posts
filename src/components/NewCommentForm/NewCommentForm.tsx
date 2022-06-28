import React, { useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../react-app-env';

interface Props {
  id: number;
  selectedPostId: number;
  onAddComment: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  id,
  selectedPostId,
  onAddComment,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const newComment = {
    id,
    postId: selectedPostId,
    name: commentName,
    email: commentEmail,
    body: commentBody,
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        onAddComment(newComment);

        setCommentName('');
        setCommentEmail('');
        setCommentBody('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={(event) => setCommentName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentEmail}
          onChange={(event) => setCommentEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={(event) => setCommentBody(event.target.value)}
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

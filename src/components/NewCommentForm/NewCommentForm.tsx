import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/posts';

interface Props {
  selectedPostId: number;
  onAddComment: (added: boolean) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddComment,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const addNewComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      postId: selectedPostId,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    };

    addComment(newComment)
      .then(() => {
        onAddComment(true);
        setCommentName('');
        setCommentEmail('');
        setCommentBody('');
      });

    onAddComment(false);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => addNewComment(event)}
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

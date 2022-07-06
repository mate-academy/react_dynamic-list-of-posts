import React, { useState } from 'react';
import { addComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  selectedPostId: number,
  loadComments: () => Promise<void>,
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  loadComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const addNewComment
    = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      const newComment = {
        postId: selectedPostId,
        name,
        email,
        body,
      };

      addComment(newComment)
        .then(() => {
          resetForm();
          loadComments();
        })
        .catch(error => {
          throw new Error(error);
        });
    };

  return (
    <form className="NewCommentForm">
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
          type="text"
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
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(event) => addNewComment(event)}
      >
        Add a comment
      </button>
    </form>
  );
};

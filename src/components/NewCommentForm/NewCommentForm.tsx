import React, { useCallback, useState } from 'react';
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
  const [newComment, setNewComment] = useState({
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  });

  const {
    name,
    email,
    body,
  } = newComment;

  const addNewComment = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      addComment(newComment)
        .then(() => {
          onAddComment(true);
          setNewComment({
            postId: selectedPostId,
            name: '',
            email: '',
            body: '',
          });
        });

      onAddComment(false);
    },
    [newComment],
  );

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
          value={name}
          onChange={(event) => setNewComment((state) => ({
            ...state,
            name: event.target.value,
          }))}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => setNewComment((state) => ({
            ...state,
            email: event.target.value,
          }))}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => setNewComment((state) => ({
            ...state,
            body: event.target.value,
          }))}
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

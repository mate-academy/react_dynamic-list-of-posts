import React, { useEffect, useState } from 'react';
import { createComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: string;
  loadData: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  loadData,
}) => {
  // eslint-disable-next-line no-console
  console.log('render NewCommentForm', selectedPostId, typeof selectedPostId);

  const initialNewComment = {
    // eslint-disable-next-line quote-props
    'postId': selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  // eslint-disable-next-line no-console
  console.log('initialNewComment = ', initialNewComment);

  const [newComment, setNewComment] = useState(initialNewComment);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect initialNewComment', initialNewComment);

    setNewComment(initialNewComment);
  },
  [selectedPostId]);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // eslint-disable-next-line no-console
    console.log(selectedPostId, 'newComment handler before', newComment,
      event.target.name, ' = ', event.target.value);

    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });

    // eslint-disable-next-line no-console
    console.log('newComment handler after', newComment);
  };

  const newCommentFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log('new comment submit', newComment);

    // eslint-disable-next-line no-console
    createComment(newComment).then(() => loadData());
    setNewComment(initialNewComment);
  };

  return (
    <form
      className="NewCommentForm"
      method="POST"
      onSubmit={newCommentFormSubmit}
    >
      {selectedPostId}
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input NewCommentForm__input--textarea"
          value={newComment.body}
          onChange={inputChangeHandler}
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

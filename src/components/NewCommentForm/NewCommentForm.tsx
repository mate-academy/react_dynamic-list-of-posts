import React, { useCallback, useState } from 'react';
import { createPostComments } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: number;
  getComments: (id: number) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  getComments,
}) => {
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const createComments = async (newComment: NewComment) => {
    await createPostComments(newComment);
  };

  const handleSubmission = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newComment = {
        ...comment,
        postId,
      };

      await createComments(newComment);
      await getComments(postId);

      setComment({
        name: '',
        email: '',
        body: '',
      });
    },
    [],
  );

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        handleSubmission(event);
      }}
    >
      <div className="form-field">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={event => {
            setComment(prevState => ({
              ...prevState,
              name: event.target.value,
            }));
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          name="email"
          type="text"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={event => {
            setComment(prevState => ({
              ...prevState,
              email: event.target.value,
            }));
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={event => {
            setComment(prevState => ({
              ...prevState,
              body: event.target.value,
            }));
          }}
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

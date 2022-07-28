import React, { FormEvent, useState } from 'react';
import './NewCommentForm.scss';
import Comment from '../types/Comment';
import { getCommentsByPostId, postComment } from '../../api/comment';

interface Props {
  postId: number,
  setComments: (comments: Comment[]) => void
}

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userComment, setUserComment] = useState<string>('');

  const clearForm = () => {
    setUserName('');
    setUserEmail('');
    setUserComment('');
  };

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      postId,
      name: userName,
      email: userEmail,
      body: userComment,
    };

    await postComment(newComment);

    const updatedComments = await getCommentsByPostId(postId);

    setComments(updatedComments);

    clearForm();
  };

  return (
    <form className="NewCommentForm" onSubmit={onFormSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={userComment}
          onChange={(event) => setUserComment(event.target.value)}
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

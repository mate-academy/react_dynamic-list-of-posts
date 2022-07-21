import React, { FormEvent, useState } from 'react';
import './NewCommentForm.scss';
import { addComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/coment';

type Props = {
  postId: number,
  setComments: (comments: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  postId,
  setComments,
}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');

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

    await addComment(newComment);

    const updatedComments = await getPostComments(postId);

    setComments(updatedComments);

    clearForm();
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handleUserComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(event.target.value);
  };

  return (
    <form className="NewCommentForm" onSubmit={onFormSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={handleUserName}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={handleUserEmail}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={userComment}
          onChange={handleUserComment}
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

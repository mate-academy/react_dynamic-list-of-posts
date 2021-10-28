import React, { ChangeEvent, useState } from 'react';
import { createPostComment } from '../../api/comments';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  onCreatedComment: (comment: PostComment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCreatedComment }) => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');

  const changeInputName = (e: string) => {
    setUserName(e);
  };

  const changeInputEmail = (e: string) => {
    setUserEmail(e);
  };

  const changeInputComment = (e: string) => {
    setNewComment(e);
  };

  const submitComment = (event: React.FormEvent) => {
    event.preventDefault();

    createPostComment({
      postId,
      name: userName,
      email: userEmail,
      body: newComment,
    })
      .then(result => {
        onCreatedComment(result);
        setUserName('');
        setUserEmail('');
        setNewComment('');
      });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitComment}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={userName}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            changeInputName(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={userEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            changeInputEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={newComment}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            changeInputComment(e.target.value);
          }}
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

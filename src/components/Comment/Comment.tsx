import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <>
      <p className="comment__name">{name}</p>
      <p className="comment__body">{body}</p>
      <a href="`{email}`" className="comment__email">{email}</a>
    </>
  );
};

import React, { FC } from 'react';
import { CommentType } from '../../utils/interfaces';
import './Comment.css';

interface Props {
  comment: CommentType;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <>
      <h3 className="comment__title">{name}</h3>
      <p className="comment__text">{body}</p>
      <p className="comment__email">{email}</p>
    </>
  );
};

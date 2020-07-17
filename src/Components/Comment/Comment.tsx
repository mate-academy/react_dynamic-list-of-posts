import React, { FC } from 'react';
import { CommentInterface } from '../../interfaces';
import './Comment.css';

interface CommentProps {
  comment: CommentInterface;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const {
    name,
    body,
    email,
  } = comment;

  return (
    <>
      <p className="comments__item comments__item--name">
        {name}
      </p>
      <p className="comments__item comments__item--body">
        {body}
      </p>
      <p className="comments__item comments__item--email">
        <a href="# ">
          {email}
        </a>
      </p>
    </>
  );
};

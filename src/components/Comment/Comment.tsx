import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <li className="comment">
      <p className="comment__autor">
        <span>{`autor: ${name} `}</span>
        <span>{`e-mail: ${email}`}</span>
      </p>
      <p className="comment__text">{body}</p>
    </li>
  );
};

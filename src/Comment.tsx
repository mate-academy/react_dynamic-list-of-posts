import React from 'react';
import { commentType } from './interfaces';

export const Comment: React.FC<commentType> = ({ comment }) => {
  return (
    <li className="comment" key={comment.id}>
      <p>{comment.name}</p>
      <p className="comment__body">{comment.body}</p>
      <a className="mail" href="mailto:1111@mail.ru">{comment.email}</a>
    </li>
  );
};

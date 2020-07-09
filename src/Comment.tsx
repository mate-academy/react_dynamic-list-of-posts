import React from 'react';
import { commentsType } from './interfaces';

export type commentType = {
  comment: commentsType;
};

export const Comment: React.FC<commentType> = ({ comment }) => (
  <li className="comment">
    <p>{comment.name}</p>
    <p className="comment__body">{comment.body}</p>
    <a className="mail" href="mailto:1111@mail.ru">{comment.email}</a>
  </li>
);

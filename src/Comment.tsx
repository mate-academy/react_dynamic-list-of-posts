import React from 'react';
import { CommentsInterface } from './interfaces';

interface Props {
  comment: CommentsInterface;
}

export const Comment: React.FC<Props> = ({ comment }) => (
  <li className="comment">
    <p>{comment.name}</p>
    <p className="comment__body">{comment.body}</p>
    <a className="mail" href="mailto:1111@mail.ru">{comment.email}</a>
  </li>
);

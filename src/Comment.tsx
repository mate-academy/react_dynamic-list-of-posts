import React from 'react';
import { Comment } from './interfaces';

interface Props {
  comment: Comment;
}

export const CommentItem: React.FC<Props> = ({ comment }) => (
  <li className="comment">
    <p>{comment.name}</p>
    <p className="comment__body">{comment.body}</p>
    <a className="mail" href="mailto:1111@mail.ru">{comment.email}</a>
  </li>
);

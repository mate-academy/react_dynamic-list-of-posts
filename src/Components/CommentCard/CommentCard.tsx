import React from 'react';
import './CommentCard.css';

type CommentValues = {
  name: string;
  body: string;
  email: string;
}

type Props = {
  comment: CommentValues,
}

export const CommentCard: React.FC<Props> = ({ comment: { name, body, email }}) => {
  return (
    <li className="comment">
    <div className="comment__contacts">
      <p>{name}</p>
      <p>{email}</p>
    </div>
    <p>{body}</p>
  </li>
  );
}
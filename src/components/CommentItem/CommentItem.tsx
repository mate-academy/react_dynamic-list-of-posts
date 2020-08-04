import React, { FC } from 'react';
import { Comment } from '../../interfaces';

interface Props {
  content: Comment;
}

export const CommentItem: FC<Props> = ({ content }) => {
  const { name, body, email } = content;

  return (
    <div className="card text-white bg-secondary mb-3">
      <div className="card-header">{name}</div>
      <div className="card-body">
        <p>{body}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

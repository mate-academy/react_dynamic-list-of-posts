import React, { FC } from 'react';
import { Comment } from '../../interfaces';

interface Props {
  content: Comment;
}

export const CommentItem: FC<Props> = ({ content }) => {
  const { name, body, email } = content;

  return (
    <div>
      <h6>{name}</h6>
      <p>{body}</p>
      <p>{email}</p>
    </div>
  );
};

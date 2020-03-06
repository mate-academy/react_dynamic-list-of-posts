import React, { FC } from 'react';
import { CommentInterface } from '../../types';

import './Comment.css';

interface Props {
  comment: CommentInterface
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <li className="сomment">
      <span className="сomment__name">{`${name} (${email})`}</span>
      <p className="сomment__body">{body}</p>
    </li>
  );
};

import React, { FC } from 'react';
import { Comment as Comments } from '../types';

import './Comment.css';

interface Props {
  comment: Comments;
}

export const Comment: FC<Props> = ({ comment: { name, body, email } }) => (
  <li className="comments">
    <p>{name}</p>
    <p>{body}</p>
    <p className="comments__email">
      Email:
      {` ${email}`}
    </p>
  </li>
);

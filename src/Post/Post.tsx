import React, { FC } from 'react';
import { Post as Posts } from '../types';

import './Post.css';

interface Props {
  post: Posts;
}

export const Post: FC<Props> = ({ post: { title, body } }) => (
  <li className="post">
    <h2>{title}</h2>
    <p>{body}</p>
  </li>
);

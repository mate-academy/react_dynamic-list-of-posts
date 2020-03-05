import React, { FC } from 'react';
import { AllPostProps } from '../types';

import './Post.css';

interface Props {
  post: AllPostProps;
}

export const Post: FC<Props> = ({ post: { title, body } }) => (
  <li className="post">
    <h2>{title}</h2>
    <p>{body}</p>
  </li>
);

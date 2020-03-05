import React, { FC } from 'react';
import { PreparedPost } from '../../types';
import { User } from '../User/User';
import { Comments } from '../Comments/Comments';

import './Post.css';

interface Props {
  post: PreparedPost
}

export const Post: FC<Props> = ({ post }) => {
  const { title, body, user, comments } = post;

  return (
    <li className="post">
      <h2 className="post__title">{title}</h2>
      <p className="post__body">{body}</p>
      {user && <User user={user} />}
      {comments && <Comments comments={comments} />}
    </li>
  );
}

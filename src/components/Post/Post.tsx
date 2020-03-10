import React, { FC } from 'react';
import './Post.css';
import { User } from '../User/User';
import { Comments } from '../Comments/Comments';

interface Props {
  postInfo: PreparedPost;
}

export const Post: FC<Props> = ({
  postInfo: {
    title,
    body,
    user,
    comments,
  },
}) => (
  <div className="post">
    <h3 className="post__title">{title}</h3>
    <p className="post__description">{body}</p>
    <User person={user} />
    <Comments comments={comments} />
  </div>
);

import React, { FC } from 'react';
import './Post.css';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  post: PostWithComments
}

export const Post: FC<Props> = ({post}) => {
  const {
    title, body, user, comments,
  } = post;

  return (
    <li className="post">
      <h3 className="post__title">{title}</h3>
      <p className="post__text">{body}</p>
      <User user={user} />
      <CommentList comments={comments} />
    </li>
  );
};

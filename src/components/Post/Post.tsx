import React, { FC } from 'react';
import './Post.css';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

export const Post: FC<Props> = (props) => {
  const {
    title, body, user, comments,
  } = props;

  return (
    <li className="post">
      <h3 className="post__title">{title}</h3>
      <p className="post__text">{body}</p>
      <User user={user} />
      <CommentList comments={comments} />
    </li>
  );
};

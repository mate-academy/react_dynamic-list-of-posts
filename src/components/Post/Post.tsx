import React, { FC } from 'react';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import { FullPostType } from '../../utils/interfaces';
import './Post.css';

interface Props {
  post: FullPostType;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <>
      <h2 className="post__title">{title}</h2>
      <p className="post__text">{body}</p>
      <User user={user} />
      <h2 className="post__comments">Comments</h2>
      <CommentList comments={comments} />
    </>
  );
};

import React, { FC } from 'react';

import './Post.css';

import { CommentList } from '../CommentList/CommentList';
import { User } from '../User/User';

interface Props{
  post: PreparedPost;
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
      <p className="post__body">{body}</p>
      <User user={user} />
      {`Comments: ${post.comments.length}`}
      <CommentList comments={comments} />
    </>
  );
};

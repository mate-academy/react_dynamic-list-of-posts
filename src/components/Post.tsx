import React, { FC } from 'react';
import { User } from './User';
import { CommentList } from './CommentList';

interface Props {
  post: PostWithComments;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <div className="post">
      <h2 className="title">{title}</h2>
      <p>{body}</p>
      <User user={user} />
      <CommentList comments={comments} />
    </div>
  );
};

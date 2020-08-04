import React, { FC } from 'react';
import { PreparedPost } from '../../interfaces';
import { UserItem } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  content: PreparedPost;
}

export const Post: FC<Props> = ({ content }) => {
  const { posts, user, comments } = content;
  const { title, body } = posts;

  return (
    <div>
      <h6>{title}</h6>
      <p>{body}</p>
      <UserItem user={user} />
      <CommentList comments={comments} />
    </div>
  );
};

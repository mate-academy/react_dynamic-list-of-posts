import React, { FC } from 'react';
import { PreparedPost } from '../../interfaces';
import { UserItem } from '../UserItem/UserItem';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  content: PreparedPost;
}

export const Post: FC<Props> = ({ content }) => {
  const { post, user, comments } = content;
  const { title, body } = post;

  return (
    <div>
      <h6>{title}</h6>
      <p>{body}</p>
      <UserItem user={user} />
      <CommentList comments={comments} />
    </div>
  );
};

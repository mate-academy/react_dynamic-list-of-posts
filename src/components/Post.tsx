import React, { FC } from 'react';
import { CommentList } from './CommentList';
import { User } from './User';

interface Props {
  post: PreparedPost;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title, body, comments, user,
  } = post;

  return (
    <>
      <p>{}</p>
      <h2>{title}</h2>
      <p>{body}</p>
      {user && <User user={user} />}
      <p>Comments</p>
      <ul className="comments list">
        <CommentList comments={comments} />
      </ul>
    </>
  );
};

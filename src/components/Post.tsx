import React, { FC } from 'react';
import { User } from './User';
import { CommentList } from './CommentList';

interface Props {
  post: ListofPost;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comment,
  } = post;

  return (
    <>
      <h2>{title}</h2>
      <p>{body}</p>
      <div>
        <User user={user} />
      </div>
      <CommentList commentsList={comment} />
    </>
  );
};

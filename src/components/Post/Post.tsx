import React, { FC } from 'react';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  post: FullPost;
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
      <h2 className="title">{title}</h2>
      <p>{body}</p>
      <div>
        <User user={user} />
      </div>
      <CommentList commentsList={comment} />
    </>
  );
};

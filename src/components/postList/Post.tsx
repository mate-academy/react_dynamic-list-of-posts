import React, { FC } from 'react';
import { CommentList } from '../commentsList/CommentsList';
import { User } from '../user/User';

export const Post: FC<Posts> = (post) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <div className="post">
      <div className="description">
        <span>Title:</span>
        <h3>{title}</h3>
        <span>Description:</span>
        <p>{body}</p>
        <User user={user} />
      </div>
      <p className="comments">Comments:</p>
      <CommentList comments={comments} />
    </div>
  );
};

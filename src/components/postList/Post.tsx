import React, { FC } from 'react';
import { CommentList } from '../commentsList/CommentsList';
import { User } from '../user/User';

export const Post: FC<Posts> = ({
  title,
  body,
  user,
  comments,
}) => (
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

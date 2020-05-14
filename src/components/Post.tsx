import React from 'react';
import { User } from './User';
import { CommentList } from './CommentList';

export const Post: React.FC<Post> = ({
  title, body, user, comments,
}) => (
  <article className="post">
    <h2 className="post__title">
      {title}
    </h2>
    <p className="post__body">
      {body}
    </p>
    <User {...user} />
    <p>
      <strong>Comments:</strong>
    </p>
    <CommentList comments={comments} />
  </article>
);

import React from 'react';
import { User } from './User';
import { Comments } from './Comments';

interface Props {
  post: PreparedPost;
}

export const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      <User person={post.user} />
      <Comments comments={post.comments} />
    </div>
  );
};

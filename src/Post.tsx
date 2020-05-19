import React from 'react';
import { User } from './User';
import { CommentList } from './CommentList';

type PropsPost = {
  post: PreparedPost;
};

export const Post: React.FC<PropsPost> = ({ post }) => {
  return (
    <>
      <li className="post__item">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <User user={post.user} />
        <CommentList comments={post.comments} />
      </li>
    </>
  );
};

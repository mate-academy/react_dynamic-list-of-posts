import React from 'react';
import { Posts } from './helper';
import CommentList from './CommentList';
import User from './User';

type Props = {
  post: Posts;
};

const Post: React.FC<Props> = ({ post }) => {
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <User users={post.user} />
      <CommentList comments={post.comments} />
    </>
  );
};

export default Post;

import React from 'react';
import { Posts } from './helper';
import CommentList from './CommentList';
import UserItem from './UserItem';

type Props = {
  post: Posts;
};

const Post: React.FC<Props> = ({ post }) => {
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <UserItem user={post.user} />
      <CommentList comments={post.comments} />
    </>
  );
};

export default Post;

import React from 'react';
import { PostProps } from '../PropTypes';
import './Post.css';

import User from '../User/User';
import CommentList from '../CommentList/CommentList';

const Post = ({ post }) => {
  const { user, comments } = post;

  return (
    <div className="post">
      <h1 className="post-title">{post.title}</h1>
      <div>{post.body}</div>
      <User email={user.email} name={user.name} address={user.address} />
      <CommentList comments={comments} />
    </div>
  );
};

Post.propTypes = PostProps;

export default Post;

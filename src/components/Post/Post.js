import React from 'react';
import './Post.css';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import { PostPropTypes } from '../../constants/prototypes';

const Post = ({ post }) => {
  const { user, comments } = post;

  return (
    <div className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-text">{post.body}</p>
      <User name={user.name} email={user.email} address={user.address} />
      <CommentList comments={comments} />
    </div>
  );
};

Post.propTypes = PostPropTypes;

export default Post;

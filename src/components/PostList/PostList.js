import React from 'react';
import { PostListProps } from '../PropTypes';
import Post from '../Post/Post';
import './PostList.css';

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </div>
);

PostList.propTypes = PostListProps;

export default PostList;

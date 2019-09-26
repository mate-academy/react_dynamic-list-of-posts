import React from 'react';
import './PostList.css';
import { PostListProps } from '../PropTypes/PropTypes';
import Post from '../Post/Post';

const PostList = ({ posts, comments }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post post={post} key={post.id} comments={comments} />
    ))}
  </div>
);

PostList.propTypes = PostListProps;

export default PostList;

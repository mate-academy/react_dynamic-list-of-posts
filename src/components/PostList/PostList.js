import React from 'react';
import './PostList.css';
import Post from '../Post/Post';
import { PostListPropTypes } from '../../constants/prototypes';

const PostList = ({ posts }) => (
  <div className="container">
    {posts.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </div>
);

PostList.propTypes = PostListPropTypes;

export default PostList;

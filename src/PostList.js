import React from 'react';
import Post from './Post';

const PostList = ({ posts }) => (
  posts.map(postData => (
    <Post post={postData} />
  ))
);

export default PostList;

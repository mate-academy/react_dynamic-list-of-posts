import React from 'react';
import Post from '../Post/Post';
import './PostList.css';

const PostList = ({ fullPosts }) => fullPosts.map(post => (
  <Post post={post} key={post.id} />
));

export default PostList;

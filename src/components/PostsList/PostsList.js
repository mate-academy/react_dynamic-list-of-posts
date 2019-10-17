import React from 'react';
import Post from '../Post/Post';
import './PostsList.css';

const PostsList = ({ posts }) => (
  <div className="post-list">
    { posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

export default PostsList;

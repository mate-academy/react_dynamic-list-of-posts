import React from 'react';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div className="wrapper">
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;

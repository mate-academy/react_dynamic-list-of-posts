import React from 'react';
import Post from '../Post/Post';

function PostList({ fullPosts }) {
  return (
    fullPosts.map(post => (
      <Post post={post} key={post.id} />
    ))
  );
}

export default PostList;

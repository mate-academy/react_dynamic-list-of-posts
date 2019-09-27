import React from 'react';

import Post from '../Post/Post';

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </div>
)

export default PostList;

import React from 'react';
import Post from './Post';

const PostList = ({ list }) => (
  <>
    {list.map(post => <Post key={post.id} {...post} />)}
  </>
);

export default PostList;

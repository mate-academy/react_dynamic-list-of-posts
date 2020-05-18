import React from 'react';
import Post from './Post';

const PostList = ({ list, highlightSearch }) => (
  list.map(
    post => <Post {...post} key={post.id} highlightedText={highlightSearch} />,
  )
);

export default PostList;

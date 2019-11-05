import React from 'react';
import Post from '../Post/Post';

const PostList = ({fullPosts}) =>
  fullPosts.map(post => (
    <Post post={post} />
  ));

export default PostList;

import React from 'react';
import Post from './Post';

function PostList(props) {
  const postItems = props.posts.map(post => <Post {...post} key={post.id}/>);
  return (
      <div>{postItems}</div>
  );
}

export default PostList;

import Post from './Post';
import React from 'react';

export default function PostList(props) {
  const posts = props.posts.map(post => {
    return (
      <Post
        title={post.title}
        body={post.body}
        userInfo={post.userInfo}
        comments={post.comments}
        key={post.id}
      />
    );
  });
  return (
    <div className='post-list'>{posts}</div>
  );
}

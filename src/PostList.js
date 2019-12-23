import React from 'react';
import Post from './Post';

const PostList = ({ info }) => (
  info.map(post => (
    <section className="post shadow" key={post.id}>
      <Post data={post} />
    </section>
  ))
);

export default PostList;

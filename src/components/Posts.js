import React from 'react';

const Posts = ({ post }) => (
  <>
    <h3>
    Title: {post.title}
    </h3>
    <p>
      {post.body}
    </p>
  </>
);

export default Posts;

import React from 'react';

interface Props {
  post: PostType;
}

export const Post: React.FC<Props> = ({ post }) => (
  <div>
    <h1>
      {post.title}
    </h1>
    <p>
      {post.body}
    </p>
  </div>
);

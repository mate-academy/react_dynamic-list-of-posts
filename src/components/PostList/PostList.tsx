import React from 'react';
import { PostItem } from './PostItem';

interface Props {
  posts: Post[];
}

export const PostList: React.FC<Props> = ({ posts }) => (
  <div>
    {posts.map((post) => (
      <PostItem {...post} key={post.id} />
    ))}
  </div>
);

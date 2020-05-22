import React from 'react';
import { Post } from '../../helpers/api';
import { PostCard } from '../PostCard/PostCard';

type Props = {
  posts: Post[];
}

export const PostList: React.FC<Props> = ({ posts }) => (
  <ul>
    {posts.map((post: Post) => (
      <PostCard
          post={post}
          key={post.id}
      />
    ))}
  </ul>
);

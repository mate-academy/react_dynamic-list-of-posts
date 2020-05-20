import React from 'react';
import { PostCard } from './Post';
import { Post } from '../helper/api';

interface Props {
  visiblePost: Post[];
}

export const PostList = ({ visiblePost }: Props) => (
  <div>
    {visiblePost.map(post => (
      <PostCard key={post.id} {...post} />
    ))}
  </div>
);

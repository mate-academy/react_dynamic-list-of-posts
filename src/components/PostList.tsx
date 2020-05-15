import React from 'react';
import './PostList.css';

import { PostCard } from './PostCard';

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => (
  <>
    <ul className="post__list">
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </ul>
  </>
);

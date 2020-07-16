import React, { useState } from 'react';
import { PostList } from './PostList';
import { PostFilter } from './PostFilter';
import { PostExtended } from '../interfaces/data';

interface Props {
  initialPosts: PostExtended[];
}

export const PostsBlock: React.FC<Props> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<PostExtended[]>(initialPosts);

  return (
    <div>
      <PostFilter
        initialPosts={initialPosts}
        setPosts={setPosts}
      />
      <PostList posts={posts} />
    </div>
  );
};

import React, { FC } from 'react';
import { Post } from '../Post/Post';

interface Props {
  posts: PostExtended[];
}

export const PostsList: FC<Props> = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

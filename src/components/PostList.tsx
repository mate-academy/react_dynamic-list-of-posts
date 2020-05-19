import React from 'react';
import { Post } from './Post';


interface Props {
  posts: PostType[];
}

export const PostList: React.FC<Props> = ({ posts }) => (
  <ul className="post-list">
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </ul>
);

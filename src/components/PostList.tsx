import React from 'react';
import { PostItem } from './PostItem';
import { PostExtended } from '../interfaces/data';

interface Props {
  posts: PostExtended[];
}

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <PostItem {...post} />
        </li>
      ))}
    </ul>
  );
};

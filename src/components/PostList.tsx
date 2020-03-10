import React, { FC } from 'react';
import { PostItem } from './PostItem';

interface Props {
  posts: CorrectPost[];
}

export const PostList: FC<Props> = ({ posts }) => {
  return (
    <ul className="posts">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

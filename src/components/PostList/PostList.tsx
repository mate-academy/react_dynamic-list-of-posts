import React, { FC } from 'react';
import { Post } from '../Post/Post';

interface Props {
  allPosts: CompletePostInterface[];
}

export const PostList: FC<Props> = ({ allPosts }) => {
  return (
    <div className="post-list">
      {allPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

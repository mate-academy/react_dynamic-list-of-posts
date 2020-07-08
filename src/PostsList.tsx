/* eslint-disable no-console */
import React from 'react';
import { postsListType } from './interfaces';
import { Post } from './Post';

export const PostsList: React.FC<postsListType> = ({ posts }) => {
  return (
    <ul className="posts">
      {
        posts.map(post => <Post post={post} />)
      }
    </ul>
  );
};

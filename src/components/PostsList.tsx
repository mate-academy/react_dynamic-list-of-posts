import React, { FC } from 'react';

import { PostItem } from './PostItem';

import { FullPost } from '../constants/types';
import './PostsList.css';

interface Props {
  posts: FullPost[];
}


export const PostsList: FC<Props> = props => {
  const { posts } = props;

  return (
    <ul>
      {posts.map(post => (
        <li
          key={post.id}
          className="post-item"
        >
          <PostItem post={post} />
        </li>
      ))}
    </ul>
  );
};

import React, { FC } from 'react';
import { Post } from './Post';

interface Props {
  posts: PreparedPostInterface[];
}

export const PostList: FC<Props> = ({ posts }) => (
  <ul className="list">
    {posts.map(post => (
      <li key={post.id} className="list__item">
        <Post post={post} />
      </li>
    ))}
  </ul>
);

import React, { FC } from 'react';

import { Post } from '../Post/Post';
import './PostList.css';

interface Props{
  posts: PreparedPost[];
}

export const PostList: FC<Props> = ({ posts }) => (
  <div className="Postlist">
    {posts.map(post => (
      <div className="post" key={post.id}>
        <Post post={post} />
      </div>
    ))}
  </div>
);

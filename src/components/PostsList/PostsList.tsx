import React, { FC } from 'react';
import { PreparedPost } from '../../types';
import { Post } from '../Post/Post';

import './PostsList.css';

interface Props {
  posts: PreparedPost[]
}

export const PostsList: FC<Props> = ({ posts }) => (
  <ul className="posts_wrapper">
    {posts.map(post => <Post key={post.id} post={post} />)}
  </ul>
);

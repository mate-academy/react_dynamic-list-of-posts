import React, { FC } from 'react';
import { Post } from './Post';

interface Props {
  posts: Posts[];
}

export const PostList: FC<Props> = ({ posts }) => (
  <>
    {posts.map(post => <Post key={post.id} {...post} />)}
  </>
);

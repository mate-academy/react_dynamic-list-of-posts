import React from 'react';
import { uuid } from 'uuidv4';
import { Post } from './interfaces';
import { PostItem } from './Post';

interface Props {
  posts: Post[];
}

export const PostsList: React.FC<Props> = ({ posts }) => (
  <ul className="posts">
    {
      posts.map(post => <PostItem key={uuid()} post={post} />)
    }
  </ul>
);

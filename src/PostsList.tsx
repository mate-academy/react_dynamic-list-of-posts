/* eslint-disable no-console */
import React from 'react';
import { uuid } from 'uuidv4';
import { preparedPostsType } from './interfaces';
import { Post } from './Post';

type Props = {
  posts: preparedPostsType[];
};

export const PostsList: React.FC<Props> = ({ posts }) => (
  <ul className="posts">
    {
      posts.map(post => <Post key={uuid()} post={post} />)
    }
  </ul>
);

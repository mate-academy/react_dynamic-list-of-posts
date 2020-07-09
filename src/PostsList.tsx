/* eslint-disable no-console */
import React from 'react';
import { uuid } from 'uuidv4';
import { preparedPostsType } from './interfaces';
import { Post } from './Post';

type postsListType = {
  posts: preparedPostsType[];
};

export const PostsList: React.FC<postsListType> = ({ posts }) => (
  <ul className="posts">
    {
      posts.map(post => <Post key={uuid()} post={post} />)
    }
  </ul>
);

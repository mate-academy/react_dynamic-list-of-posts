import React, { FC } from 'react';
import { PreparedPost } from '../../interfaces';
import { Post } from '../Post/Post';

interface Props {
  posts: PreparedPost[];
}

export const PostList: FC<Props> = ({ posts }) => {
  return (
    <div>
      {
        posts.map(post => <Post content={post} />)
      }
    </div>

  );
};

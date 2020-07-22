import React, { FC } from 'react';
import { Post } from './Post';

interface Props {
  listOfPost: ListofPost[];
}

export const PostList: FC<Props> = ({ listOfPost }) => (
  <div>
    {listOfPost.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

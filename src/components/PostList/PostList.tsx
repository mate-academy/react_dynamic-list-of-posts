import React, { FC } from 'react';
import { Post } from '../Post/Post';

interface Props {
  postlists: FullPost[];
}

export const PostList: FC<Props> = ({ postlists }) => (
  <div className="container">
    {postlists.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

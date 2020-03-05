import React, { FC } from 'react';
import './PostList.css';
import { Post } from '../Post/Post';

interface Props {
  allPosts: PostInterface[];
}

export const PostList: FC<Props> = ({ allPosts }) => {
  return (
    <div className="post-list">
      {allPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

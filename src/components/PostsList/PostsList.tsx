import React, { FC } from 'react';
import './PostsList.css';
import { Post } from './Post/Post';

interface Props {
  posts: PreparedPost[];
}

export const PostsList: FC<Props> = ({
  posts,
}) => {
  return (
    <ul className="post-list">
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </ul>
  );
};

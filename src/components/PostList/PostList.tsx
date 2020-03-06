import React, { FC } from 'react';
import { CompletePost } from '../../types';
import { NewPost } from '../NewPost/NewPost';
import './PostList.css';

interface Props {
  posts: CompletePost[];
}

export const PostList: FC<Props> = ({ posts }) => {
  return (
    <div className="posts__wrapper">
      {posts.map((post: CompletePost) => (
        <NewPost
          post={post}
          key={post.id}
        />
      ))}
    </div>
  );
};

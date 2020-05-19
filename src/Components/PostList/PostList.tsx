import React from 'react';
import { PostCard } from '../PostCard/PostCard';
import { Post } from '../../Helpers/api';
import './PostList.css';

type Props = {
  posts: Post[],
}

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="post__list">
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
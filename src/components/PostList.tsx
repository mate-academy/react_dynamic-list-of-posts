import React from 'react';
import { PostWithUser } from '../helpers/typeDefs';
import { Post } from './Post';

type Props ={
  posts: PostWithUser[];
};

export const PostList: React.FC<Props> = ({ posts }) => (
  <div className="post__list">
    {posts.map(post => (
      <div className="item" key={post.id}>
        <Post post={post} />
      </div>
    ))}
  </div>
);

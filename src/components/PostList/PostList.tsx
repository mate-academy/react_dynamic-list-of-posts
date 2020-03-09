import React, { FC } from 'react';
import { PostComponent } from '../Post/Post';

interface Props {
  posts: PostsInterface[];
}

export const PostsList: FC<Props> = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <PostComponent key={post.id} post={post} />
    ))}
  </div>
);

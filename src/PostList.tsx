import React from 'react';
import Post from './Post';
import { NormalizedPost } from './interfaces';

interface PostListProps {
  posts: NormalizedPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <section className="post__list">
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </section>
);

export default PostList;

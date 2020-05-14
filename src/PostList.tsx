import React from 'react';
import Post from './Post';

type Props = {
  posts: PostProps[];
};

const PostList: React.FC<Props> = ({ posts }) => (
  <>
    {posts.map((post: PostProps) => (
      <Post post={post} key={post.id} />
    ))}
  </>
);

export default PostList;

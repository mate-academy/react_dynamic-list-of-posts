import React from 'react';
import Post from './Post';

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul className="posts__list">
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </ul>
  );
};

export default PostList;

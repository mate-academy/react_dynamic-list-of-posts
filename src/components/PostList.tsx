import React from 'react';
import './PostList.css';

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul className="list">
      {posts.map(post => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default PostList;

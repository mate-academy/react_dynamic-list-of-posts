import React from 'react';
import Post from '../Post/Post';
import './PostList.css';

type Props = {
  posts: Post[];
};

const PostList: React.FC<Props> = ({ posts }) => (
  <div className="post__container">
    {posts.map(post => (
      <Post
        key={post.id}
        post={post}
      />
    ))}
  </div>
);

export default PostList;

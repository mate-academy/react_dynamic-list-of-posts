import React from 'react';
import './PostList.css';
import PostItem from '../PostItem/PostItem';

type Props = {
  posts: PreparedPost[];
};

const PostList: React.FC<Props> = ({ posts }) => (
  <div className="container">
    {posts.map((post: PreparedPost) => (
      <PostItem {...post} key={post.id} />
    ))}
  </div>
);

export default PostList;

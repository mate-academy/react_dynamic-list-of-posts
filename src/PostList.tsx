import React from 'react';
import Post from './Post';

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <>
    <div className="post__list">
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  </>
);

export default PostList;

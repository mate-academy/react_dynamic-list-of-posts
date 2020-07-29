import React from 'react';
import './PostList.css';
import { Post } from '../Post/Post';
import { PreparedPosts, Props } from '../types';

export const PostList: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div className="posts">
      {posts.map((post: PreparedPosts) => (
        <React.Fragment key={post.id}>
          <div>
            <Post post={post} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

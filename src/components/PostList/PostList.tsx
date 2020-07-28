import React from 'react';
import './PostList.css';
import { Post } from '../Post/Post';

interface Props {
  posts: Post[];
}

export const PostList: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <ul className="posts">
      {
        posts.map((currentPost) => (
          <li key={currentPost.id}>
            <Post post={currentPost} />
          </li>
        ))
      }
    </ul>
  );
};

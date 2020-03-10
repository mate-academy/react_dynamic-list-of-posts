import React, { FC } from 'react';
import { PreparedPosts } from '../interfaces';
import { Post } from './Post';

interface Props {
  posts: PreparedPosts[];
}

export const PostList: FC<Props> = ({ posts }) => {
  return (
    <ul className="posts">
      {posts.map(post => (
        <li key={post.id} className="post">
          <Post
            title={post.title}
            body={post.body}
            user={post.user}
            comments={post.comments}
          />
        </li>
      ))}
    </ul>

  );
};

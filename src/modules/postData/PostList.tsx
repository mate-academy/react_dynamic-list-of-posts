import React from 'react';
import { Post } from './Post';
import './PostList.css';
import { PreparedPosts } from '../interfaces';

interface PostList {
  preparedPosts: PreparedPosts[];
}

export const PostList = ({ preparedPosts }: PostList) => (
  <>
    {preparedPosts.map(post => (

      <div className="post" key={post.id}>
        <Post {...post} />
      </div>

    ))}
  </>
);

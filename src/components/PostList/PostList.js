import React from 'react';
import PostItem from '../Post/Post';
import { PostListProps } from '../../constants/proptypes';

import './PostList.css';

const PostList = ({ posts }) => (
  <ul className="post-list">
    {posts.map(post => (
      <li className="post-list__item ui card" key={post.id}>
        <PostItem post={post} />
      </li>
    ))}
  </ul>
);

PostList.propTypes = PostListProps;

export default PostList;

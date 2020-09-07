import React from 'react';
import './PostList.scss';

import PropTypes from 'prop-types';

import { Post } from '../Post/Post';

export const PostList = ({ posts }) => (
  <div className="PostList">
    {posts.map(current => (
      <Post
        key={current.post.id}
        post={current}
      />
    ))}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

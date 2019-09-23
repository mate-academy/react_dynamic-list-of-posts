import React from 'react';
import './PostList.css';

import PropTypes from 'prop-types';
import { Post } from '../Post/Post';

export const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post data={post} key={post.id} />))
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

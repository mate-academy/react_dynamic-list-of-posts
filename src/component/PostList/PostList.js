import React from 'react';
import PropTypes from 'prop-types';

import './PostList.css';
import Post from '../Post/Post';

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;

import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts, filter }) => (
  <div>
    <div className="PostList">
      <h1>Dynamic list of posts</h1>
      <input
        className="PostList__filter"
        type="search"
        placeholder="Enter to filter"
        onChange={filter}
      />
    </div>
    {posts.map(post => (
      <Post post={post} />
    ))}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  filter: PropTypes.func,
};

export default PostList;

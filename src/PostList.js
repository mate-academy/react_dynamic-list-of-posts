import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts, filter }) => (
  <section>
    <div className="PostList__title">
      <span> List of posts </span>
      <input
        type="search"
        placeholder="filter by header of text"
        onChange={filter}
        className="filter-input"
      />
    </div>
    {posts.map(post => (
      <Post post={post} />
    ))}
  </section>
);

PostList.propTypes = {
  posts: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  filter: PropTypes.func,
};

export default PostList;

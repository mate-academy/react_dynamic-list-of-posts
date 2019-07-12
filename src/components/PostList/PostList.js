import React from 'react';
import PropTypes from 'prop-types';

import './PostList.css';
import PostContent from './PostContent/PostContent';

const PostList = ({ posts, handleFilter }) => (
  <div>
    <input
      type="text"
      placeholder="Search field by body"
      onChange={handleFilter}
      className="search-field"
    />
    {posts.map(post => <PostContent key={post.id} post={post} />)}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default PostList;

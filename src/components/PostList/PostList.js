import React from 'react';
import PropTypes from 'prop-types';

import './PostList.css';
import PostContent from './PostContent/PostContent';

const PostList = ({ posts, handleSort }) => (
  <div>
    <input
      type="text"
      placeholder="Search field by body"
      onChange={handleSort}
      className="search-field"
    />
    {
      posts.map(post => <PostContent key={post.id} post={post} />)
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default PostList;

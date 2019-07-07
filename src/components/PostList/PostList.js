/* eslint-disable
  react/jsx-one-expression-per-line
*/
import React from 'react';
import PropTypes from 'prop-types';

import './PostList.css';
import PostContent from './PostContent/PostContent';

const PostList = ({ posts, sortData }) => (
  <div>
    <input
      type="text"
      placeholder="Search field"
      onChange={sortData}
      className="search-field"
    />
    {
      posts.map(post => <PostContent key={post.id} post={post} />)
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  sortData: PropTypes.func.isRequired,
};

export default PostList;

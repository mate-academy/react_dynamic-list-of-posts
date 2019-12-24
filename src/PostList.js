import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ filterPosts }) => (
  <div className="postList">
    {filterPosts.map(postItem => (<Post post={postItem} key={postItem.id} />
    ))}
  </div>
);

PostList.propTypes = {
  filterPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;

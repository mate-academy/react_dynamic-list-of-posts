import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = props => (
  <div>
    {props.posts.map(currentPost => (
      <Post post={currentPost} />
    ))}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object])).isRequired,
};

export default PostList;

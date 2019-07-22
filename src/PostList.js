import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ currentPost }) => (
  <div className="app__container">
    {currentPost.map(post => (
      <Post dataPost={post} key={currentPost.id} />
    ))}
  </div>
);

PostList.propTypes = {
  currentPost: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
};

export default PostList;

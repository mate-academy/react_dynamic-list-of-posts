import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ postsCurrent }) => (
  <>
    {postsCurrent.map(post => (
      <Post dataPost={post} key={postsCurrent.id} />
    ))}
  </>
);

PostList.propTypes = {
  postsCurrent: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
};

export default PostList;

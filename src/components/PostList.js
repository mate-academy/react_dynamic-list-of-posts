import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

function PostList({ postList }) {
  return (
    <div>
      {postList.map(post => (
        <Post post={post} />
      ))}
    </div>
  );
}

PostList.propTypes = {
  postList: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default PostList;

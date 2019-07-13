import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ filtredPosts }) => (
  <ul>
    {filtredPosts.map(post => (
      <div>
        <Post key={post.id} post={post} />
      </div>
    ))
    }
  </ul>
);

PostList.propTypes = {
  filtredPosts: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object])).isRequired,
};

export default PostList;

import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => (
  <div className="posts">
    { posts.map(post => (
      <Post postOne={post} key={post.id} />
    )) }
  </div>
);

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.object).isRequired };

export default PostList;

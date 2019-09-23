import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';
import './PostsList.css';

const PostsList = ({ posts }) => (
  <div className="ui cards">
    {posts.map(post => (<Post post={post} key={post.id} />))}
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsList;

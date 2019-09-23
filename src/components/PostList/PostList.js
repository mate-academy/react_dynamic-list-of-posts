import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';

const PostList = ({ posts }) => posts.map(post => (
  <Post post={post} key={post.id} />
));

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

PostList.propTypes = {
  posts: PropTypes.arrayOf(shape).isRequired,
};

export default PostList;

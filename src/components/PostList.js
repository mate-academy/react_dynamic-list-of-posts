import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ posts }) => posts.map(postData => (
  <Post key={postData.id} post={postData} />
));

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.object).isRequired };

export default PostList;

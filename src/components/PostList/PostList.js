import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';

const PostList = ({ posts }) => (
  posts.map(item => (
    <Post post={item} key={item.id} />
  ))
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.shape({
        street: PropTypes.string,
        suite: PropTypes.string,
        city: PropTypes.string,
      }),
    }),
    comments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      body: PropTypes.string,
      email: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    })),
  })).isRequired,
};

export default PostList;

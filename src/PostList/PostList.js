import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';
import './PostList.css';

const PostList = ({ posts }) => (
  <div className="container">
    {posts
      .map(post => <Post post={post} key={post.id} />)}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf({
    post: PropTypes.shape({
      comments: PropTypes.arrayOf({
        comment: PropTypes.shape({
          body: PropTypes.string,
          email: PropTypes.string,
          name: PropTypes.string,
        }).isRequired,
      }).isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.shape({
          city: PropTypes.string,
          street: PropTypes.string,
          suite: PropTypes.string,
          zipcode: PropTypes.string,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostList;

import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post/Post';

const PostList = ({ posts }) => (
  <div>
    {
      posts.map(post => (
        <Post {...post} key={`post ${post.id}`} />
      ))
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string.isRequired,
      address: PropTypes.object,
    }),
  })).isRequired,
};

export default PostList;

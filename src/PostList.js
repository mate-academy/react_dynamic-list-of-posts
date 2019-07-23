import React from 'react';
import propTypes from 'prop-types';
import './styles/PostList.css';
import Post from './Post';

const PostList = ({ posts }) => (
  posts.map(post => (
    <Post key={post.id} post={post} />
  ))
);

PostList.propTypes = {
  posts: propTypes.shape({
    id: propTypes.number,
  }).isRequired,
};
export default PostList;

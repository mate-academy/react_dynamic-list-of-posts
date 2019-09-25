import React from 'react';
import './PostList.css';
import PropTypes from 'prop-types';
import Post from '../Post/Post';

const PostList = ({ posts }) => posts.map(post => (
  <div className="posts">
    <Post post={post} key={post.id} />
  </div>
));

const postListProps = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
}).isRequired;

PostList.propTypes = {
  posts: PropTypes.arrayOf(postListProps).isRequired,
};

export default PostList;

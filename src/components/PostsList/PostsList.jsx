import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { Post } from './Post';
import { postShapes } from '../shapes/postShapes';

export const PostsList = ({
  posts,
  selectedPost,
  openPost,
  closePost,
  setSelectedPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <Post
          post={post}
          selectedPost={selectedPost}
          openPost={openPost}
          closePost={closePost}
          setSelectedPost={setSelectedPost}
          key={post.id}
        />
      ))}
    </ul>
  </div>
);

PostsList.defaultProps = {
  posts: [],
  selectedPost: null,
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(postShapes)),
  selectedPost: PropTypes.number,
  openPost: PropTypes.func.isRequired,
  closePost: PropTypes.func.isRequired,
  setSelectedPost: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { Post } from '../Post';

export const PostsList = ({ posts, setPostId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts && posts.map(post => (
        <Post
          key={post.id}
          post={post}
          setPostId={setPostId}
          selectedPostId={selectedPostId}
        />
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  setPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};

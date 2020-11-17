import React from 'react';
import PropTypes from 'prop-types';
import { postShapes } from '../shapes/postShapes';

export const Post = ({
  post,
  selectedPost,
  openPost,
  closePost,
  setSelectedPost,
}) => (
  <li key={post.id} className="PostsList__item">
    <div>
      <b>
        {`[User # ${post.userId}]: ${post.title}`}
      </b>
    </div>

    {selectedPost === post.id
      ? (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => {
            closePost(setSelectedPost);
          }}
        >
          Close
        </button>
      )
      : (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => {
            openPost(setSelectedPost, post.id);
          }}
        >
          Open
        </button>
      )}
  </li>
);

Post.defaultProps = {
  selectedPost: null,
};

Post.propTypes = {
  post: PropTypes.shape(postShapes).isRequired,
  openPost: PropTypes.func.isRequired,
  closePost: PropTypes.func.isRequired,
  setSelectedPost: PropTypes.func.isRequired,
  selectedPost: PropTypes.number,
};

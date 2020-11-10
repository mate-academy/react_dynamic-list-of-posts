import React from 'react';
import PropTypes from 'prop-types';
import { PostShape } from '../../shapes/PostShape';

export const Post = ({ post, showPostDetails, isOpen }) => (
  <li className="PostsList__item">
    <div>
      <b>
        [User #
        {post.userId}
        ]:&nbsp;
      </b>
      {post.title}
    </div>
    <button
      type="button"
      className="PostsList__button button"
      onClick={() => {
        showPostDetails(post);
      }}
    >
      {isOpen ? 'Close' : 'Open'}
    </button>
  </li>
);

Post.propTypes = {
  post: PostShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  showPostDetails: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

export const Post = ({ post, choosePost, selectedPostId }) => (
  <li className="PostsList__item" key={post.id}>
    <div>
      <b>
        {`[User #${post.userId}]:`}
      </b>
      {post.title}
    </div>
    <button
      type="button"
      className="PostsList__button button"
      onClick={() => choosePost(post.id)}
    >
      {selectedPostId === post.id
        ? 'Close'
        : 'Open'
      }
    </button>
  </li>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  choosePost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};

import React, { memo } from 'react';
import PropTypes from 'prop-types';

export const Post = memo(({
  post,
  selectedPostId,
  isPostVisible,
  showPost,
}) => (
  <li
    className="PostsList__item"
    key={post.id}
  >
    <div>
      <b>
        {`[User #${post.userId}]: `}
      </b>
      {post.title}
    </div>
    <button
      type="button"
      className="PostsList__button button"
      onClick={() => showPost(post)}
    >
      {selectedPostId === post.id && isPostVisible ? 'Close' : 'Open'}
    </button>
  </li>
));

Post.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  isPostVisible: PropTypes.bool.isRequired,
  showPost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}.isRequired;

import React, { useState } from 'react';
import './PostsList.scss';

import PropTypes from 'prop-types';

export const PostsList = ({ posts, setPostId }) => {
  const [detailedPostId, setDetailedPostId] = useState(null);

  const checkDetailsOpeness = (postId) => {
    if (detailedPostId === postId) {
      setPostId(null);
      setDetailedPostId(null);

      return;
    }

    setPostId(postId);
    setDetailedPostId(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => checkDetailsOpeness(post.id)}
            >
              {detailedPostId && detailedPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setPostId: PropTypes.func.isRequired,
};

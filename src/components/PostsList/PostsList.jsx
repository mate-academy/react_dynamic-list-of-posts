import React from 'react';
import './PostsList.scss';

import PropTypes from 'prop-types';

export const PostsList = ({ posts, selectedPostId, onselectedPostDetails }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>{`[User #${post.userId}]:`}</b>
            {post.title}
          </div>
          <button
            type="button"
            className={selectedPostId === post.id
              ? 'PostsList__button--selected button'
              : 'PostsList__button button'}
            onClick={() => {
              onselectedPostDetails(post.id);
            }}
          >
            {selectedPostId === post.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  onselectedPostDetails: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

export const PostsList = ({ posts, activePost, getActivePost }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>

          {activePost === post.id ? (
            <button
              type="button"
              className="PostsList__button button button__select"
              onClick={() => getActivePost(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => getActivePost(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  activePost: PropTypes.number.isRequired,
  getActivePost: PropTypes.func.isRequired,
};

import React from 'react';

import './PostsList.scss';

import PropTypes from 'prop-types';

export const PostsList = ({
  posts,
  selectedPostId,
  setPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(({ id, userId, title }) => (
        <li key={id} className="PostsList__item">
          <div>
            <b>{`[User #${userId}]: `}</b>
            {title}
          </div>
          {id === selectedPostId ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setPostId(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setPostId(id)}
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
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

export const PostsList = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(({ id, userId, title }) => (
        <li className="PostsList__item" key={id}>
          <div>
            <b>
              {`[User #${userId}]:`}
              {' '}
            </b>
            {title}
          </div>

          {id === selectedPostId ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(id)}
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
  setSelectedPostId: PropTypes.func.isRequired,
};

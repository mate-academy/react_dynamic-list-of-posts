
import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts, selectedPostId, setSelectedPostId }) => (
  <div className="PostsList">

    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(({ userId, title, id }) => (
        <li
          className="PostsList__item"
          key={id}
        >
          <div>
            <b>
              [User #
              {userId}
              ]:
              {' '}
            </b>
            {title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => {
              selectedPostId === id
                ? setSelectedPostId()
                : setSelectedPostId(id);
            }}
          >
            {selectedPostId === id ? 'Close' : 'Open'}
          </button>

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
  setSelectedPostId: PropTypes.number.isRequired,
};

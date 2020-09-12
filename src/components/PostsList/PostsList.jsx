import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, postId, setSelection }) => {
  const select = (id) => {
    if (postId === id) {
      setSelection(0);
    } else {
      setSelection(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(({ id, userId, title }) => (
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
              onClick={() => select(id)}
            >
              {postId === id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  postId: PropTypes.number.isRequired,
  setSelection: PropTypes.func.isRequired,
};
